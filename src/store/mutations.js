export const mutations = {
  // user
  setUser(state, payload) {
    state.user = payload
  },
  setAdmin(state, payload) {
    state.IS_ADMIN = payload
  },

  // ORDERS
  setOrders(state, payload) {
    state.orders = payload
  },
  orderStatistics(state, payload) {
    state.orderStatistics = payload
  },
  setConfirmationObj(state, payload) {
    state.confirmationObj = payload
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

  // REVIEWS
  setReviews(state, payload) {
    state.reviews = payload
  },
  reviewStatistics(state, payload) {
    state.reviewStatistics = payload
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
  },

  // COMPANY INFO
  setCompanyInfo(state, payload) {
    state.companyInfo = payload
  }
}
