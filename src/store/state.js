export const state = () => ({
  USER: {
    // Arrays of ids in database, but
    // Full product obj in client side
    cart: {},
    // ids only
    orders: []
  },
  IS_ADMIN: false,
  ADMINS: ['smelayapandagm@gmail.com'],
  LOADING: false,
  ERR: null
})
