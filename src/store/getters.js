export const getters = {
  // USER
  user: state => state.user,
  allUsers: state => state.allUsers,
  watchedUserId: state => state.watchedUserId,

  // SERVICES
  SERVICE_TYPES: state => state.SERVICE_TYPES,

  // PRODUCTS
  products: state => state.products,
  singleProduct: state => state.singleProduct,
  lastVisible: state => state.lastVisible,
  productCommonFilters: state => state.productCommonFilters,
  productDynamicFilters: state => state.productDynamicFilters,
  selectedCatalogNode: state => state.selectedCatalogNode,
  dynamicFilteredProductsIds: state => state.dynamicFilteredProductsIds,
  algoliaSQLFilter: state => state.algoliaSQLFilter,
  algoliaSearchText: state => state.algoliaSearchText,
  productStatistics: state => state.productStatistics,
  productCounters: state => state.productCounters,
  PRODUCT_TREE: state => state.PRODUCT_TREE,
  DYNAMIC_PROPS: state => state.DYNAMIC_PROPS,

  // ORDERS
  orders: state => state.orders,
  orderStatistics: state => state.orderStatistics,
  confirmationObj: state => state.confirmationObj,
  ORDER_STATUSES: state => state.ORDER_STATUSES,
  PAYMENT_ENDING: state => state.PAYMENT_ENDING,
  PAYMENT_METHODS: state => state.PAYMENT_METHODS,
  PAYMENT_STATUSES: state => state.PAYMENT_STATUSES,
  PAYMENT_TYPES: state => state.PAYMENT_TYPES,
  DELIVERY_METHODS: state => state.DELIVERY_METHODS,
  DISCOUNT_TYPES: state => state.DISCOUNT_TYPES,

  // COMPANY INFO
  companyInfo: state => state.companyInfo,

  // REVIEWS
  reviews: state => state.reviews,
  reviewStatistics: state => state.reviewStatistics,
  REVIEW_STATUSES: state => state.REVIEW_STATUSES,

  // USER REQUESTS
  requests: state => state.requests,
  requestsStatistics: state => state.requestsStatistics,
  REQUESTS_STATUSES: state => state.REQUESTS_STATUSES,

  // DICTIONARIES
  dictionaries: state => state.dictionaries,

  // QUESTIONS
  questions: state => state.questions,

  // SYSTEM
  IS_ADMIN: state => state.IS_ADMIN, // (Boolean) current user is admin?
  ADMINS: state => state.ADMINS, // (Array) list of admin emails
  LOADING: state => state.LOADING, // (Boolean) global loading flag
  ERR: state => state.ERR, // (Object) global error object
  ANCHOR: state => state.ANCHOR // FOR SCROLL TO ANCHOR
}
