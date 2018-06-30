exports.handler = function (change, context, admin) {
    console.log(CONST.LOG_DELIMITER)
    let created = 0
    let handled = 0
    let total = 0
    return admin.firestore().collection('userRequests').get()
        .then(snapshot => {
            snapshot.docs.forEach(doc => {
                if (doc.data().status === 'created') {
                    created += 1
                } else if (doc.data().status === 'handled') {
                    handled += 1
                }
                total++
            })
            return admin.firestore().collection('statistics').doc('userRequests').update({
                created: created,
                handled: handled,
                total: total
            })
        })
        .then(() => {
            console.log('Statistics: user requests updated!')
            return true
        })
        .catch(err => {
            console.log(err)
        })
}
