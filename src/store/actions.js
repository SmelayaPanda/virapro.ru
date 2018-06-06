import firebase, {auth, fs, GoogleProvider} from "../services/fireinit";
import {Message, Notification} from 'element-ui'

export const actions = {

  // PRODUCTS
  loadSingleProduct({commit, getters, dispatch}, payload) {
    let products = getters.products ? getters.products : {}
    return firebase.firestore().collection('products').doc(payload).get()
      .then(snap => {
        products[snap.id] = snap.data()
        commit('setProducts', {...products})
        console.log('Single product loaded')
      })
      .catch(err => dispatch('LOG', err))
  },

  fetchProducts({commit, getters, dispatch}) {
    commit('LOADING', true)
    if (getters.algoliaSearchText) {
      return // product -> shop (old result)
    }
    let filter = getters.productFilters
    let query = firebase.firestore().collection('products')
    if (filter.maxPrice) {
      query = query
        .where('price', '>=', filter.minPrice)
        .where('price', '<=', filter.maxPrice)
    }
    if (filter.group) {
      query = query.where('group', '==', filter.group)
    }
    if (filter.category) {
      query = query.where('category', '==', filter.category)
    }
    if (filter.country) {
      query = query.where('originCountry', '==', filter.country)
    }
    if (filter.brand) {
      query = query.where('brand', '==', filter.brand)
    }
    if (filter.color) {
      query = query.where('color', '==', filter.color)
    }
    if (filter.material) {
      query = query.where('material', '==', filter.material)
    }
    query = query.orderBy('price', filter.sortByPrice)
    if (getters.lastVisible) {
      query = query.startAfter(getters.lastVisible)
    }
    if (filter.limit) {
      query = query.limit(filter.limit)
    }

    query.get()
      .then((snap) => {
        let products
        if (getters.lastVisible) {
          products = getters.products ? getters.products : {}
        } else {
          products = {}
        }
        if (snap.size === filter.limit) {
          commit('setLastVisible', snap.docs[snap.docs.length - 1])
        } else {
          commit('setLastVisible', null)
        }
        snap.docs.forEach(doc => {
          products[doc.id] = doc.data()
        })
        console.log(products)
        commit('setProducts', {...products})
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },

  productFilters({commit, getters}, payload) {
    commit('productFilters', payload)
  },

  algoliaSearch({commit, getters, dispatch}, payload) {
    commit('LOADING', true)
    let filter = getters.productFilters
    const ALGOLIA_APP_ID = '2CVO44WQ94'
    const ALGOLIA_SEARCH_KEY = '68d8a98b0c136d3dbd0a799949007e8d'
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)
    let index
    if (process.env.NODE_ENV === 'production') {
      index = client.initIndex('MISTERIO-PROD-PRODUCTS')
    } else if (process.env.NODE_ENV === 'development') {
      index = client.initIndex('e_store_products')
    }
    let facetFilters = []
    let numericFilters = []
    if (filter.group) facetFilters.push(`group:${filter.group}`)
    if (filter.category) facetFilters.push(`category:${filter.category}`)
    if (filter.country) facetFilters.push(`country:${filter.country}`)
    if (filter.brand) facetFilters.push(`brand:${filter.brand}`)
    if (filter.color) facetFilters.push(`color:${filter.color}`)
    if (filter.material) facetFilters.push(`material:${filter.material}`)
    if (filter.maxPrice) numericFilters.push(`price <= ${filter.maxPrice}`)
    if (filter.minPrice) numericFilters.push(`price >= ${filter.minPrice}`)
    index
      .search({
        query: payload,
        facetFilters: facetFilters,
        numericFilters: numericFilters
      })
      .then(responses => {
        let resp = responses.hits
        let actions = []
        let fetchProduct = function (id) {
          return firebase.firestore().collection('products').doc(id).get()
        }
        for (let product in resp) {
          if (resp.hasOwnProperty(product)) {
            actions.push(fetchProduct(resp[product].objectID))
          }
        }
        return Promise.all(actions)
      })
      .then((snap) => {
        let products = {}
        if (snap) {
          // sort object by price here,
          // because client key not allow to switch algolia sort
          let arr = []
          snap.forEach(doc => arr.push(doc.data()))
          if (filter.sortByPrice === 'asc') {
            arr.sort((a, b) => a.price - b.price)
          } else {
            arr.sort((a, b) => b.price - a.price)
          }
          arr.forEach(el => {
            products[el.productId] = el
          })
        }
        commit('setProducts', {...products})
        commit('LOADING', false)
        commit('algoliaSearchText', payload)
        commit('setLastVisible', null)
      })
      .catch(err => dispatch('LOG', err))
  },
  setLastVisible({commit}, payload) {
    commit('setLastVisible', payload)
  },
  setAlgoliaSearchText({commit}, payload) {
    commit('algoliaSearchText', payload)
  },
  addNewProduct({commit, getters, dispatch}, payload) {
    commit('LOADING', true)
    let products = getters.products ? getters.products : {}
    let updateData
    firebase.firestore().collection('products').add(payload)
      .then(snap => {
        updateData = {
          // add productId field for quick access anywhere
          productId: snap.id,
          // Cloud function fill up it!
          img_0: {original: '', thumbnail: '', card: ''},
          img_1: {original: '', thumbnail: '', card: ''},
          img_2: {original: '', thumbnail: '', card: ''},
          img_3: {original: '', thumbnail: '', card: ''},
          img_4: {original: '', thumbnail: '', card: ''}
        }
        let newProduct = {[snap.id]: Object.assign(updateData, payload)}
        products = Object.assign(newProduct, products)
        return firebase.firestore().collection('products').doc(snap.id).update(updateData)
      })
      .then(() => {
        commit('setProducts', {...products})
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },

  editProduct({commit, getters, dispatch}, payload) {
    commit('LOADING', true)
    let products = getters.products
    firebase.firestore().collection('products').doc(payload.productId).update(payload)
      .then(() => {
        products[payload.productId] = payload
        commit('setProducts', {...products})
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },

  editProductImage({commit, dispatch}, payload) {
    commit('LOADING', true)
    dispatch('subscribeToSubImagesCreation', payload.productId)
    let images = payload.images
    let uploadImage = function (name, image) {
      return firebase.storage().ref('products/' + payload.productId + '/' + name).put(image)
    }
    let actions = []
    for (let img in images) {
      actions.push(uploadImage(img, images[img]))
    }
    return Promise.all(actions)
      .then(() => {
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },
  subscribeToSubImagesCreation({commit, getters}, payload) { // realtime change images
    let products = getters.products
    firebase.firestore().collection('products').doc(payload)
      .onSnapshot(doc => {
        products[doc.id] = doc.data()
        commit('setProducts', {...products})
      })
  },
  deleteProduct({commit, getters, dispatch}, payload) {
    commit('LOADING', true)
    let products = getters.products
    firebase.firestore().collection('products').doc(payload).delete()
      .then(() => {
        let product = products[payload]
        let images = [] // images names
        for (let i = 0; i < 5; i++) {
          if (product['img_' + i].original !== '') {
            images.push('img_' + i)
            images.push('card_img_' + i)
            images.push('thumb_img_' + i)
          }
        }
        let deleteImage = function (name) {
          return firebase.storage().ref('products/' + payload + '/' + name).delete()
        }
        let actions = images.map(deleteImage)
        return Promise.all(actions)
      })
      .then(() => {
        delete products[payload]
        commit('setProducts', {...products})
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },
  fetchProductStatistics({commit, dispatch}) {
    firebase.firestore().collection('statistics').doc('products').get()
      .then(snapshot => {
        console.log('Statistics: for products')
        commit('productStatistics', snapshot.data())
      })
      .catch(err => dispatch('LOG', err))
  },

  // USER
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

  signUserUp({commit, dispatch, getters}, payload) {
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
      $nuxt.$router.push('/account')
      resolve()
    })
  },

  signOut({commit}) {
    auth.signOut().then(() => {
      commit('setUser', null)
    }).catch(err => console.log(error))
  },

  signUserIn({commit, dispatch}, payload) {
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
                role: 'guest',
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

  logout({dispatch, commit}) {
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


  // DICTIONARIES
  fetchDictionaries({commit, dispatch}) {
    commit('LOADING', true)
    firebase.firestore().collection('dictionaries').get()
      .then(snapshot => {
        let docs = snapshot.docs
        docs.forEach(doc => {
          commit('setDictionary', {name: doc.id, data: doc.data().all})
        })
        console.log('Fetched: dictionaries')
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },

  uploadDictionary({commit, getters, dispatch}, payload) {
    let name = payload.name
    delete payload.dictionary
    commit('LOADING', true)
    firebase.firestore().collection('dictionaries').doc(name).set({all: payload.data})
      .then(() => {
        commit('setDictionary', {name: payload.name, data: payload.data})
        commit('LOADING', false)
        console.log('Dictionary updated')
      })
      .catch(err => dispatch('LOG', err))
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
