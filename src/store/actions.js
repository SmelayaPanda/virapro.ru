import firebase, {auth, db, fs, GoogleProvider} from "../services/fireinit";
import {Message, Notification} from 'element-ui'
import algoliasearch from 'algoliasearch'

export const actions = {

  // nuxtServerInit ({ dispatch }, { req }) {
  //   return Promise.all([
  //     // dispatch('loadSingleProduct', 'yUHgunWESW5E5aUybki8')
  //   ])
  // },
  // PRODUCTS
  loadSingleProduct({commit, getters, dispatch}, payload) {
    return fs.collection('products').doc(payload).get()
      .then(snap => {
        commit('setSingleProduct', {...snap.data()})
        console.log('(i) Single product loaded')
      })
      .catch(err => dispatch('LOG', err))
  },

  fetchProducts({commit, getters, dispatch}) {
    commit('LOADING', true)
    if (getters.algoliaSearchText) {
      return // product -> shop (old result)
    }
    let filter = getters.productCommonFilters
    let query = fs.collection('products')
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
    // if (filter.country) {
    //   query = query.where('originCountry', '==', filter.country)
    // }
    // if (filter.brand) {
    //   query = query.where('brand', '==', filter.brand)
    // }
    // if (filter.color) {
    //   query = query.where('color', '==', filter.color)
    // }
    // if (filter.material) {
    //   query = query.where('material', '==', filter.material)
    // }
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
        commit('setProducts', {...products})
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },

  async setProductCommonFilters({commit, getters}, payload) {
    commit('setProductCommonFilters', await payload)
  },

  async setProductDynamicFilters({commit, getters}, payload) {
    commit('setProductDynamicFilters', await payload)
  },

  async setAlgoliaSQLFilter({commit, getters}, payload) {
    commit('setAlgoliaSQLFilter', await payload)
  },

  algoliaSearch({commit, getters, dispatch}, payload) {
    commit('LOADING', true)
    commit('algoliaSearchText', payload)
    commit('setLastVisible', null)
    let comFilter = getters.productCommonFilters
    let dynFilter = getters.algoliaSQLFilter
    const ALGOLIA_APP_ID = '895KFYHFNM'
    const ALGOLIA_SEARCH_KEY = '743fdead3dcea56354ccfbf001d370ca'
    const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY)
    let index
    if (process.env.NODE_ENV === 'production') {
      index = client.initIndex('DEV_SANTEHNIKA')
    } else if (process.env.NODE_ENV === 'development') {
      index = client.initIndex('DEV_SANTEHNIKA')
    }
    let facetFilters = []
    let numericFilters = []
    if (comFilter.group) facetFilters.push(`group:${comFilter.group}`)
    if (comFilter.category) facetFilters.push(`category:${comFilter.category}`)
    if (comFilter.maxPrice) numericFilters.push(`price <= ${comFilter.maxPrice}`)
    if (comFilter.minPrice) numericFilters.push(`price >= ${comFilter.minPrice}`)
    let search = {
      query: payload,
      facetFilters: facetFilters,
      numericFilters: numericFilters
    }
    if (dynFilter.length) search.filters = dynFilter

    index
      .search(search)
      .then(responses => {
        let resp = responses.hits
        let actions = []
        let fetchProduct = function (id) {
          return fs.collection('products').doc(id).get()
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
          if (comFilter.sortByPrice === 'asc') {
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
    fs.collection('products').add(payload)
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
        return fs.collection('products').doc(snap.id).update(updateData)
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
    fs.collection('products').doc(payload.productId).update(payload)
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
    fs.collection('products').doc(payload)
      .onSnapshot(doc => {
        products[doc.id] = doc.data()
        commit('setProducts', {...products})
      })
  },
  deleteProduct({commit, getters, dispatch}, payload) {
    commit('LOADING', true)
    let products = getters.products
    fs.collection('products').doc(payload).delete()
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
    fs.collection('statistics').doc('products').get()
      .then(snapshot => {
        console.log('(i) Statistics: for products')
        commit('productStatistics', snapshot.data())
      })
      .catch(err => dispatch('LOG', err))
  },


  // ORDERS
  fetchOrders:
    ({commit, getters, dispatch}, payload) => {
      commit('LOADING', true)
      let query = fs.collection('orders')
      if (payload.userId) {
        query = query.where('buyer.userId', '==', payload.userId)
      }
      if (payload.status) {
        query = query.where('status', '==', payload.status)
      }
      let orders = {}
      query.orderBy('history.created', 'desc').get()
        .then(snap => {
          snap.docs.forEach(doc => {
            orders[doc.id] = doc.data()
            orders[doc.id].id = doc.id
            orders[doc.id].showDetails = false // for collapse details
          })
          commit('setOrders', {...orders})
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },


  subscribeToOrderModification:
    ({commit, getters, dispatch}, payload) => {
      let orders = getters.orders ? getters.orders : {}
      return fs.collection('orders').doc(payload)
        .onSnapshot(function (doc) {
          console.log('(i) Order changed')
          let order = doc.data()
          order.id = doc.id
          orders[doc.id] = order
          commit('setOrders', {...orders})
        })
    },


  checkout:
    ({commit, getters, dispatch}, payload) => {
      commit('LOADING', true)
      let user = getters.user
      let orders = getters.orders ? getters.orders : {}
      fs.collection('orders').add(payload)
        .then((docRef) => {
          payload.id = docRef.id
          orders[docRef.id] = payload
          let actions = []
          // 1. Decrease totalQty of each products
          let decreaseQty = function (id, totalQty) {
            return fs.collection('products').doc(id).update({totalQty: totalQty})
          }
          let productQty = 0
          payload.products.forEach(el => {
            productQty = user.cart[el.id].totalQty
            delete user.cart[el.id]
            actions.push(decreaseQty(el.id, productQty - el.qty > 0 ? productQty - el.qty : 0))
          })
          // 2. Update user data
          let orderIds = Object.keys(orders)
          let cartProductIds = user.cart ? Object.keys(user.cart) : []
          let updateUserData = function (cart, ordersIds) {
            return fs.collection('users').doc(user.uid).update({cart: cart, orders: ordersIds})
          }
          actions.push(updateUserData(cartProductIds, orderIds))
          return Promise.all(actions)
        })
        .then(() => {
          commit('setOrders', {...orders})
          commit('setUser', {...user})
          commit('LOADING', false)
          Notification({
            title: 'Поздравляем!',
            message:
            'Заказ совершен! ' +
            'Мы свяжемся с Вами в ближайшее время для подтверждения покупки.',
            type: 'success',
            showClose: true,
            duration: 30000,
            offset: 50
          })
          router.push('/cart')
        })
        .catch(err => dispatch('LOG', err))
    },


  updateOrder:
    ({commit, getters, dispatch}, payload) => {
      commit('LOADING', true)
      let orders = getters.orders
      fs.collection('orders').doc(payload.id).update(payload.updateData)
        .then(() => {
          if (payload.type === 'payment_success') {
            orders[payload.id].payment.status = 'succeeded'
          } else {
            delete orders[payload.id]
          }
          console.log('(i) Order updated')
          commit('setOrders', {...orders})
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },
  fetchOrderStatistics:
    ({commit, dispatch}) => {
      fs.collection('statistics').doc('orders').get()
        .then(snapshot => {
          console.log('(i) Statistics: for orders')
          commit('orderStatistics', snapshot.data())
        })
        .catch(err => dispatch('LOG', err))
    },
  setConfirmationObj({commit}, payload) {
    commit('setConfirmationObj', payload)
  },


  // user
  // user DATA = full firebase auth.currentUser object + app data keeping in firestore db
  fetchUserData({commit, dispatch, getters}, payload) {
    commit('LOADING', true)
    let user = {} // auth object read only, copy them
    return fs.collection('users').doc(payload.uid).get()
      .then(snap => {
        user.uid = payload.uid
        user.email = payload.email
        user.isAnonymous = payload.isAnonymous
        user.emailVerified = payload.emailVerified
        user.favorites = snap.data().favorites
        user.firstname = snap.data().firstname
        user.lastname = snap.data().lastname
        user.orders = snap.data().orders
        user.cart = snap.data().cart
        user.role = snap.data().role
        commit('setUser', user)
        return Promise.all([
          dispatch('setAdmin'),
          dispatch('loadOwnProducts'),
          // dispatch('fetchOrders', {userId: user.uid})
        ])
      })
      .then(() => {
        commit('LOADING', false)
        console.log('(i) Fetched: all user data')
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
        console.log('(i) Personal info updated!')
      })
      .catch(err => dispatch('LOG', err))
  },

  signUpWithEmailAndPassword({commit, dispatch}, payload) {
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
        $nuxt.$router.push('/account')
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },

  upgradeAnonymousAccount({commit, dispatch}, payload) {
    let credential = firebase.auth.EmailAuthProvider.credential(payload.email, payload.password)
    auth.currentUser.linkWithCredential(credential)
      .then(user => {
        dispatch('fetchUserData', user)
        user.sendEmailVerification() // TODO: verification link may be expired, force resend
        console.log('(i) User register. Email verification sent.')
        console.log('(i) Anonymous account successfully upgraded', user)
        return Promise.all([
          fs.collection('users').doc(user.uid)
            .update({
              email: payload.email,
              firstname: payload.firstname,
              lastname: payload.lastname,
              emailVerified: user.emailVerified,
              isAnonymous: false
            }),
          db.ref(`liveChats/${user.uid}/props`).update({userEmail: user.email})
        ])
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
    }).catch(err => console.log(err))
  },

  signInWithEmailAndPassword({commit, dispatch}, payload) {
    commit('ERR', '')
    commit('LOADING', true)
    auth.signInAndRetrieveDataWithEmailAndPassword(payload.email, payload.password)
      .then(() => { // onAuthStateChanged works
        console.log('(i) >> Successful Login')
        $nuxt.$router.push('/account')
        commit('LOADING', false)
      })
      .catch(err => dispatch('LOG', err))
  },

  signInAnonymously:
  // All users initially register as anonymous
    ({commit, dispatch}) => {
      commit('setUser', {cart: [], orders: []})
      firebase.auth().signInAnonymouslyAndRetrieveData() // TODO: deprecated - replace by signInAnonymously()
        .then((data) => { // onAuthStateChanged works
          return fs.collection('users').doc(data.user.uid)
            .set({ // initialize user for quick update
              role: 'guest',
              cart: [],
              orders: [],
              favorites: []
            })
        })
        .then(() => {
          console.log('(i) >> You are sign in anonymously')
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
      let favorites = {}
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
          console.log('(i) Fetched: user cart products')
        })
        .catch(err => dispatch('LOG', err))
    },
  async setAdmin({commit, getters}) {
    commit('setAdmin', await
      getters.ADMINS.indexOf(getters.user.email) !== -1
    )
  },


  // DICTIONARIES
  fetchDictionaries:
    ({commit, dispatch}) => {
      commit('LOADING', true)
      return fs.collection('dictionaries').get()
        .then(snapshot => {
          let docs = snapshot.docs
          docs.forEach(doc => {
            commit('setDictionary', {name: doc.id, data: doc.data().all})
          })
          console.log('(i) Fetched: dictionaries')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },


  uploadDictionary:
    ({commit, getters, dispatch}, payload) => {
      let name = payload.name
      delete payload.dictionary
      commit('LOADING', true)
      fs.collection('dictionaries').doc(name).set({all: payload.data})
        .then(() => {
          commit('setDictionary', {name: payload.name, data: payload.data})
          commit('LOADING', false)
          console.log('(i) Dictionary updated')
        })
        .catch(err => dispatch('LOG', err))
    },

  // COMPANY INFO
  fetchCompanyInfo:
    ({commit, dispatch}) => {
      commit('LOADING', true)
      fs.collection('companyInfo').get()
        .then(snap => {
          let companyInfo = {}
          snap.docs.forEach(doc => {
            companyInfo[doc.id] = doc.data()
          })
          commit('setCompanyInfo', {...companyInfo})
          console.log('(i) Fetched: company info')
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },


  updateCompanyInfo:
    ({commit, getters, dispatch}, payload) => {
      commit('LOADING', true)
      let companyInfo = getters.companyInfo
      fs.collection('companyInfo').doc(payload.document)
        .update({[payload.field]: payload.value})
        .then(() => {
          companyInfo[payload.document][payload.field] = payload.value
          console.log('(i) Company info updated')
          commit('setCompanyInfo', {...companyInfo})
          commit('LOADING', false)
        })
        .catch(err => dispatch('LOG', err))
    },


  // REVIEWS
  fetchReviews:
    ({commit, dispatch}, payload) => {
      commit('LOADING', true)
      let query = fs.collection('reviews')
      if (payload.status) {
        query = query.where('status', '==', payload.status)
      }
      query.get()
        .then(snapshot => {
          let reviews = {}
          snapshot.docs.forEach(doc => {
            reviews[doc.id] = doc.data()
            reviews[doc.id].id = doc.id
          })
          commit('setReviews', {...reviews})
          commit('LOADING', false)
          console.log('(i) Fetched: reviews')
        })
        .catch(err => dispatch('LOG', err))
    },
  addReview:
    ({commit, getters, dispatch}, payload) => {
      commit('LOADING', true)
      payload.userId = getters.user.uid
      fs.collection('reviews').add(payload)
        .then(() => {
          commit('LOADING', false)
          console.log('(i) Review added')
          Notification({
            title: 'Спасибо',
            message: 'Ваш отзыв будет опубликован после проходения модерации!',
            type: 'success',
            showClose: true,
            duration: 10000,
            offset: 50
          })
        })
        .catch(err => dispatch('LOG', err))
    },
  updateReview:
    ({commit, dispatch}, payload) => {
      commit('LOADING', true)
      fs.collection('reviews').doc(payload.reviewId).update(payload.updateData)
        .then(() => {
          dispatch('fetchReviews', {status: payload.oldStatus})
          commit('LOADING', false)
          console.log('(i) Review updated')
        })
        .catch(err => dispatch('LOG', err))
    },
  fetchReviewStatistics:
    ({commit, dispatch}) => {
      fs.collection('statistics').doc('reviews').get()
        .then(snapshot => {
          console.log('(i) Statistics: for reviews')
          commit('reviewStatistics', snapshot.data())
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
