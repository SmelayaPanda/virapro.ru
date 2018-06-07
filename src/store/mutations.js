export const mutations = {
  // USER
  setUser(state, payload) {
    state.USER = payload
  },
  setAdmin(state, payload) {
    state.IS_ADMIN = payload
  },


  // SYSTEM
  LOADING(state, payload) {
    state.LOADING = payload
  },
  ERR(state, payload) {
    state.ERR = payload
  },

  // DICTIONARIES
  setDictionary(state, payload) {
    state.dictionaries[payload.name] = payload.data
  },


  // PRODUCT
  setProducts(state, payload) {
    state.products = payload
  },
  setSingleProduct(state, payload) {
    state.singleProduct = payload
  },
  setLastVisible(state, payload) {
    state.lastVisible = payload
  },
  productFilters(state, payload) {
    state.productFilters = payload
  },
  algoliaSearchText(state, payload) {
    state.algoliaSearchText = payload
  },
  productStatistics(state, payload) {
    state.productStatistics = payload
  }
}
