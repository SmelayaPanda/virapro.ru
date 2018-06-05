export const state = () => ({
  // DYNAMIC DATA
  USER: {// Cart and orders IDs array in database. Full products objects array in client side
    cart: [],
    orders: []
  },
  IS_ADMIN: false,
  LOADING: false,
  ERR: null,
  // CONSTANTS
  ADMINS: ['smelayapandagm@gmail.com'],
  PRODUCT_TREE: [{
    label: 'Berries',
    children: [
      {label: 'blackberries'},
      {label: 'strawberries'},
      {label: 'cranberries'},
      {label: 'grapes'}
    ]
  }, {
    label: 'Melons',
    children: [
      {label: 'honeydew'},
      {label: 'watermelon'},
      {label: 'muskmelon'},
      {label: 'casaba'}
    ]
  }, {
    label: 'Tropical',
    children: [
      {label: 'bananas'},
      {label: 'pineapples'},
      {label: 'avocados'},
      {label: 'dates'},
      {label: 'pomegranates'},
      {label: 'papayas'},
      {label: 'mangoes'}
    ]
  }, {
    label: 'Citrus',
    children: [
      {label: 'oranges'},
      {label: 'grapefruits'},
      {label: 'tangerines'},
      {label: 'lemons'},
      {label: 'limes'},
      {label: 'kumquats'},
      {label: 'citrons'}
    ]
  }, {
    label: 'Drupes',
    children: [
      {label: 'cherries'},
      {label: 'plums'},
      {label: 'nectarines'},
      {label: 'apricots'}
    ]
  }, {
    label: 'Pomes',
    children: [
      {label: 'apples'},
      {label: 'pears'},
      {label: 'kiwis'}
    ]
  }]
})
