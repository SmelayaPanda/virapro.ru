exports.handler = function (change, context, admin) {
  console.log(CONST.LOG_DELIMITER)
  let created = 0
  let published = 0
  let archived = 0
  let totalReviews = 0
  return admin.firestore().collection('reviews').get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.data().status === 'created') {
          created += 1
        } else if (doc.data().status === 'published') {
          published += 1
        } else if (doc.data().status === 'archived') {
          archived += 1
        }
        totalReviews++
      })
      return admin.firestore().collection('statistics').doc('reviews').update({
        created: created,
        published: published,
        archived: archived,
        totalReviews: totalReviews
      })
    })
    .then(() => {
      console.log('Statistics: reviews data updated!')
      return true
    })
    .catch(err => {
      console.log(err)
    })
}
