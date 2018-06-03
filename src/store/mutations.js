export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
  setAdmin(state, payload) {
    state.isAdmin = payload
  },
  LOADING (state, payload) {
    state.LOADING = payload
  },
  ERR (state, payload) {
    state.ERR = payload
  }
}
