export const getters = {
  USER: state => state.USER, // (Object) all user data
  IS_ADMIN: state => state.IS_ADMIN, // (Boolean) current user is admin?
  ADMINS: state => state.ADMINS, // (Array) list of admin emails
  LOADING: state => state.LOADING, // (Boolean) global loading flag
  ERR: state => state.ERR, // (Object) global error object
  PRODUCT_TREE: state => state.PRODUCT_TREE
}
