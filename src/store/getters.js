export const getters = {
  // USER
  USER: state => state.USER, // (Object) all user data

  // PRODUCTS
  products: state => state.products,
  singleProduct: state => state.singleProduct,
  lastVisible: state => state.lastVisible,
  productFilters: state => state.productFilters,
  algoliaSearchText: state => state.algoliaSearchText,
  productStatistics: state => state.productStatistics,
  PRODUCT_TREE: state => state.PRODUCT_TREE,

  // COMPANY INFO
  companyInfo: state => state.companyInfo,

  // DICTIONARIES
  dictionaries: state => state.dictionaries,

  // SYSTEM
  IS_ADMIN: state => state.IS_ADMIN, // (Boolean) current user is admin?
  ADMINS: state => state.ADMINS, // (Array) list of admin emails
  LOADING: state => state.LOADING, // (Boolean) global loading flag
  ERR: state => state.ERR // (Object) global error object
}
