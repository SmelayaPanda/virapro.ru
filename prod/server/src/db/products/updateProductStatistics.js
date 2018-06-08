exports.handler = function (change, context, admin) {
  let after = change.after.data()
  let before = change.before.data()
  if (
    after.price === before.price &&
    after.totalQty === before.totalQty &&
    after.productId === before.productId // permanent product update after creation
  ) {
    console.log('No data to update product statistics!')
    return true
  } else {
    return admin.firestore().collection('products').get()
      .then(snap => {
        let maxPrice = 0
        let totalPrice = 0
        let totalStoreCoast = 0
        let totalProductQty = 0
        let i = 0
        snap.docs.forEach(doc => {
          i++
          totalPrice += doc.data().price
          totalStoreCoast += doc.data().price * doc.data().totalQty
          totalProductQty += doc.data().totalQty
          if (doc.data().price > maxPrice) {
            maxPrice = doc.data().price
          }
        })
        let avgPrice = totalPrice / i
        return admin.firestore().collection('statistics').doc('products').update({
          maxPrice: maxPrice,
          avgPrice: Number((avgPrice).toFixed(2)),
          uniqueProductQty: i,
          totalProductQty: totalProductQty,
          totalStoreCoast: totalStoreCoast
        })
      })
      .then(() => {
        console.log('Statistics: product data updated!')
        return true
      })
      .catch(err => err)
  }
}
