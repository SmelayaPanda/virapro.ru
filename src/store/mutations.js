export const mutations = {
  setUser(state, payload) {
    state.USER = payload
  },
  setAdmin(state, payload) {
    state.IS_ADMIN = payload
  },
  LOADING (state, payload) {
    state.LOADING = payload
  },
  ERR (state, payload) {
    state.ERR = payload
  }
}
