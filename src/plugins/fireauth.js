import { auth } from '../services/fireinit.js'

export default (context) => {
  const {store} = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      store.commit('setUser', user)
      if (user) {
        console.log(user)
        store.dispatch('fetchUserData', user)
          .then(() => {
            // if (this.$nuxt.$route.path.includes('admin')
            //   && (user.email === 'smelayapandagm@gmail.com')) {
            //   this.$store.dispatch('fetchAllChats')
            // } else {
            //   this.$store.dispatch('initializeChat', user)
            //   this.$store.dispatch('updateEmailVerification', user) // always check - because there is no another way
            // }
          })
      } else {
        store.dispatch('signInAnonymously')
      }
      // ALWAYS
      store.dispatch('fetchCompanyInfo') // for footer
      resolve()
    })
  })
}
