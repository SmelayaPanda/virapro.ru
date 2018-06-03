export const state = () => ({
  user: {
    // Arrays of ids in database, but
    // Full product obj in client side
    cart: {},
    // ids only
    orders: []
  },
  // SHARED
  isAdmin: false,
  admins: ['smelayapandagm@gmail.com'],
  LOADING: false,
  ERR: null
})
