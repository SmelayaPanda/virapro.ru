import { auth } from '../services/fireinit.js'

export default (context) => {
  const {store} = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      store.commit('setUser', user)
      if (user) {
        // console.log(user)
        store.dispatch('fetchUserData', user)
      } else {
        store.dispatch('signInAnonymously')
      }
      // ALWAYS dispatches-> in nuxtServerInit()
      resolve()
    })
  })
}
