import Vuex from 'vuex'
import firebase, {auth, GoogleProvider} from '../services/fireinit.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null,
      greeting: ''
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      },
      greeting: (state) => {
        return state.greeting
      }
    },
    mutations: {
      setUser (state, payload) {
        state.user = payload
      },
      setGreeting (state, payload) {
        state.greeting = payload
      }
    },
    actions: {
      autoSignIn ({commit}, payload) {
        commit('setUser', payload)
      },

      signInWithGoogle ({commit}) {
        return new Promise((resolve, reject) => {
          auth.signInWithRedirect(GoogleProvider)
          resolve()
        })
      },

      signOut ({commit}) {
        auth.signOut().then(() => {
          commit('setUser', null)
        }).catch(err => console.log(error))
      },

      sayHi ({commit}) {
        return firebase.firestore().collection('greeting').doc('hi').get()
          .then(snap => {
            console.log(snap.data())
            commit('setGreeting', snap.data())
          })
      }
    }
  })
}

export default createStore
