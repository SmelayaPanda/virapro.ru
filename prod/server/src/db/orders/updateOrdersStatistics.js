exports.handler = function (change, context, admin) {
  console.log(CONST.LOG_DELIMITER)
  let created = 0
  let pending = 0
  let sent = 0
  let delivered = 0
  let refused = 0
  let totalOrders = 0
  return admin.firestore().collection('orders').get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data().status === 'created') {
          created += 1
        } else if (doc.data().status === 'pending') {
          pending += 1
        } else if (doc.data().status === 'sent') {
          sent += 1
        } else if (doc.data().status === 'delivered') {
          delivered += 1
        } else if (doc.data().status === 'refused') {
          refused += 1
        }
        totalOrders++
      })
      return admin.firestore().collection('statistics').doc('orders').update({
        created: created,
        pending: pending,
        sent: sent,
        delivered: delivered,
        refused: refused,
        totalOrders: totalOrders
      })
    })
    .then(() => {
      console.log('Statistics: orders data updated!')
      return true
    })
    .catch(err => {
      console.log(err)
    })
}
