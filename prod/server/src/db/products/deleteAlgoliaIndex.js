const productHandlers = require('algoliasearch');
exports.handler = function (change, context, functions) {
  console.log(CONST.LOG_DELIMITER)
  return new Promise((resolve, reject) => {
    const client = productHandlers(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.deleteObject(context.params.productId, (err) => {
      if (err) {
        reject(err)
      } else {
        console.log(`Algolia: Object ${context.params.productId} deleted!`)
        resolve()
      }
    })
  })
}
