import firebase, {auth, GoogleProvider} from "../services/fireinit";

export const actions = {
  fetchUserData({commit, dispatch, getters}, payload) {
    commit('LOADING', true)
    let user = {...payload} // auth object read only, copy them!
    return firebase.firestore().collection('users').doc(user.uid).get()
      .then(snap => {
        commit('setUser', Object.assign(user, snap.data())) // add to auth user data own firestore
        return Promise.all([
          dispatch('setAdmin'),
          // dispatch('loadOwnProducts'),
          // dispatch('fetchOrders', {userId: user.uid})
        ])
      })
      .then(() => {
        commit('LOADING', false)
        console.log('Fetched: all user data')
      })
      .catch(err => dispatch('LOG', err))
  },

  editPersonalInfo({commit, getters, dispatch}, payload) {
    commit('LOADING', true)
    let user = getters.user
    firebase.firestore().collection('users').doc(user.uid).update(payload)
      .then(() => {
        commit('setUser', Object.assign(user, payload))
        commit('LOADING', false)
        console.log('Personal info updated!')
      })
      .catch(err => dispatch('LOG', err))
  },

  signUserUp:
    ({commit, dispatch}, payload) => {
      commit('ERR', null)
      commit('LOADING', true)
      dispatch('upgradeAnonymousAccount', payload)
        .then(() => {
          Notification({
            title: 'Поздравляем',
            message: 'Аккаунт был успешно создан!',
            type: 'success',
            showClose: true,
            duration: 10000,
            offset: 50
          })
          // router.push('/account')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },

  signUserIn:
    ({commit, dispatch}, payload) => {
      commit('ERR', null)
      commit('LOADING', true)
      firebase.auth.signInAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
        .then(() => { // onAuthStateChanged works
          console.log('Successful Login')
          // router.push('/account')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },

  signInWithGoogle({commit}) {
    return new Promise((resolve, reject) => {
      auth.signInWithRedirect(GoogleProvider)
      resolve()
    })
  },

  signInAnonymously:
  // All users initially register as anonymous
    ({commit, dispatch}) => {
      commit('setUser', {cart: [], orders: []})
      auth.signInAnonymouslyAndRetrieveData()
        .then((data) => { // onAuthStateChanged works
          return firebase.firestore().collection('users').doc(data.user.uid)
            .set({ // initialize user for quick update
              cart: [],
              orders: [],
              isAnonymous: data.user.isAnonymous
            })
        })
        .then(() => {
          console.log('You are sign in anonymously')
        })
        .catch(err => dispatch('LOG', err))
    },

  signOut({commit}) {
    auth.signOut().then(() => {
      commit('setUser', null)
    }).catch(err => console.log(error))
  },

  upgradeAnonymousAccount:
    ({commit, dispatch}, payload) => {
      let credential = firebase.auth.EmailAuthProvider.credential(payload.email, payload.password)
      auth.currentUser.linkWithCredential(credential)
        .then(user => {
          dispatch('fetchUserData', user)
          user.sendEmailVerification() // TODO: verification link may be expired, force resend
          console.log('User register. Email verification sent.')
          console.log('Anonymous account successfully upgraded', user)
          return Promise.all([
            firebase.firestore().collection('users').doc(user.uid)
              .update({
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: false
              }),
            firebase.database().ref(`liveChats/${user.uid}/props`).update({userEmail: user.email})
          ])
        })
        .catch(err => dispatch('LOG', err))
    },

  updateEmailVerification:
    ({commit, dispatch}, payload) => {
      firebase.firestore().collection('users').doc(payload.uid)
        .update({emailVerified: payload.emailVerified})
        .catch(err => dispatch('LOG', err))
    },

  logout:
    ({commit, dispatch}) => {
      dispatch('signInAnonymously')
        .then(() => {
          // router.push('/')
          commit('setChatMessages', [])
        })
        .catch(err => dispatch('LOG', err))
    },

  resetPassword:
    ({commit, dispatch}, payload) => {
      commit('ERR', null)
      auth.sendPasswordResetEmail(payload)
        .then(function () {
          Notification({
            title: 'Внимание',
            message: `На почту ${payload} отправлено письмо для восстановления пароля!`,
            type: 'info',
            showClose: true,
            duration: 20000,
            offset: 50
          })
        })
        .catch(function (err) {
          let errorCode = err.code
          let errorMessage = err.message
          if (errorCode === 'auth/invalid-email') {
            Message({
              type: 'error',
              showClose: true,
              message: errorMessage,
              duration: 10000
            })
          } else if (errorCode === 'auth/user-not-found') {
            Message({
              type: 'error',
              showClose: true,
              message: errorMessage,
              duration: 10000
            })
          }
          dispatch('LOG', err)
        })
    },
  updateOwnProducts:
    ({commit, getters, dispatch}, payload) => {
      commit('LOADING', true)
      const user = getters.user
      const subject = payload.subject // cart or favorites
      let pId = payload.product.productId
      if (payload.operation === 'add') {
        user[subject][pId] = payload.product
      } else if (payload.operation === 'remove') {
        delete user[subject][pId]
      }
      let productIds = []
      if (user[subject]) {
        productIds = Object.keys(user[subject])
      }
      commit('setUser', {...user}) // not good, but visual fast
      firebase.firestore().collection('users').doc(user.uid).update({[subject]: productIds})
        .then(() => {
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
  loadOwnProducts: // cart and favorites
    ({commit, getters, dispatch}) => {
      let user = getters.user
      let cart = {}
      let loadProduct = function (pId, to) {
        return firebase.firestore().collection('products').doc(pId).get()
          .then(snap => {
            if (to === 'cart' && snap.data()) { // !snap.data() === product removed
              cart[pId] = snap.data()
            } else if (to === 'favorites' && snap.data()) {
              favorites[pId] = snap.data()
            }
          })
      }
      let actions = []
      if (user.cart) {
        user.cart.forEach(pId => actions.push(loadProduct(pId, 'cart')))
      }
      if (user.favorites) {
        user.favorites.forEach(pId => actions.push(loadProduct(pId, 'favorites')))
      }
      return Promise.all(actions)
        .then(() => {
          user.cart = cart
          user.favorites = favorites
          commit('setUser', {...user})
          console.log('Fetched: user cart products')
        })
        .catch(err => dispatch('LOG', err))
    },
  async setAdmin({commit, getters}) {
    commit('setAdmin', await
      getters.admins.indexOf(getters.user.email) !== -1
    )
  },
  // APP
  ERR({commit}, payload) {
    commit('ERR', payload)
  },
  LOADING({commit}, payload) {
    commit('LOADING', payload)
  },
  LOG({commit}, payload) {
    console.log(payload)
    commit('ERR', payload)
    commit('LOADING', false)
    if (payload.code !== 'aborted') { // offline client
      firebase.database().ref('errLog').push(payload.stack ? payload.stack : payload)
    }
  }
}
