export default function ({ store, redirect, route}) {
  // if (isAdminRoute(route)) {
  //   if (store.state.USER && store.state.ADMINS.indexOf(store.state.USER.email) !== -1) {
  //     return ''
  //   } else {
  //     redirect('/account/signin')
  //   }
  // } else {
  //   return ''
  // }
}

function isAdminRoute(route) {
  if (route.matched.some(record => record.path === '/admin')) {
    return true
  }
}

function isUserRouters(route) {
  let userRoutes = ['/account', '/cart']
  if (route.matched.some(record => userRoutes.indexOf(record.path) !== -1)) {
    return true
  }
}
