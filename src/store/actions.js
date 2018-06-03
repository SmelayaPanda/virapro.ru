import firebase, {auth, GoogleProvider, fs} from "../services/fireinit";
import {Message, Notification} from 'element-ui'

export const actions = {

  // USER DATA = full firebase auth.currentUser object + app data keeping in firestore db
  fetchUserData({commit, dispatch, getters}, payload) {
    commit('LOADING', true)
    let user = {...payload} // auth object read only, copy them
    return fs.collection('users').doc(user.uid).get()
      .then(snap => {
        commit('setUser', Object.assign(user, snap.data()))
        return Promise.all([
          dispatch('setAdmin'),
          // dispatch('loadOwnProducts'),
          // dispatch('fetchOrders', {userId: user.uid})
        ])
      })
      .then(() => {
        commit('LOADING', false)
        console.log('>> Fetched: all user data')
      })
      .catch(err => dispatch('LOG', err))
  },

  editPersonalInfo({commit, getters, dispatch}, payload) {
    commit('LOADING', true)
    let user = getters.user
    fs.collection('users').doc(user.uid).update(payload)
      .then(() => {
        commit('setUser', Object.assign(user, payload))
        commit('LOADING', false)
        console.log('>> Personal info updated!')
      })
      .catch(err => dispatch('LOG', err))
  },

  signUserUp ({commit, dispatch, getters}, payload) {
    commit('ERR', '')
    commit('LOADING', true)
    fs.collection('greeting').doc('hi').get()
    return auth.createUserAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
      .then((snap) => {
        return fs.collection('users').doc(snap.user.uid).set({
          uid: snap.user.uid,
          firstname: payload.firstname,
          lastname: payload.lastname,
          email: payload.email
        })
      })
      .then(() => {
        return auth.currentUser.sendEmailVerification()
      })
      .then(() => {
        Notification({
          title: 'Yhuu',
          message: 'Account successfully created! Check email for verification.',
          type: 'success',
          showClose: true,
          duration: 30000,
          offset: 50
        })
        $nuxt.$router.push('/account')
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

  signOut({commit}) {
    auth.signOut().then(() => {
      commit('setUser', null)
    }).catch(err => console.log(error))
  },

  signUserIn ({commit, dispatch}, payload) {
    commit('ERR', '')
    commit('LOADING', true)
    auth.signInAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
      .then(() => { // onAuthStateChanged works
        console.log('>> Successful Login')
        $nuxt.$router.push('/account')
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },

  upgradeAnonymousAccount:
    ({commit, dispatch}, payload) => {
      let credential = firebase.auth.EmailAuthProvider.credential(payload.email, payload.password)
      auth.currentUser.linkWithCredential(credential)
        .then(user => {
          dispatch('fetchUserData', user)
          user.sendEmailVerification() // TODO: verification link may be expired, force resend
          console.log(' >> User register. Email verification sent.')
          console.log(' >> Anonymous account successfully upgraded', user)
          return Promise.all([
            fs.collection('users').doc(user.uid)
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
      fs.collection('users').doc(payload.uid)
        .update({emailVerified: payload.emailVerified})
        .catch(err => dispatch('LOG', err))
    },

  logout ({dispatch, commit}) {
    auth.signOut()
      .then(() => {
        commit('setUser', '')
        commit('ERR', '')
        $nuxt.$router.push('/account')
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
      fs.collection('users').doc(user.uid).update({[subject]: productIds})
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
        return fs.collection('products').doc(pId).get()
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
      getters.ADMINS.indexOf(getters.USER.email) !== -1
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
