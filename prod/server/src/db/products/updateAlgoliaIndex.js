const productHandlers = require('algoliasearch');
// DON'T FORGET SEE WHAT PRODUCT UPDATED AFTER CREATION!
exports.handler = function (change, context, functions) {
  console.log(CONST.LOG_DELIMITER)
  let after = change.after.data()
  let before = change.before.data()
  let productId = context.params.productId
  return new Promise((resolve, reject) => {

    if (
      after.title === before.title &&
      after.description === before.description &&
      after.group === before.group &&
      after.category === before.category &&
      after.price === before.price &&
      after.originCountry === before.originCountry &&
      after.material === before.material &&
      after.brand === before.brand &&
      after.color === before.color &&
      after.size === before.size &&
      after.SKU === before.SKU &&
      after.productId === before.productId // permanent product update after creation
    ) {
      console.log('No fields to update Algolia index!')
      return resolve()
    } else {
      const client = productHandlers(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
      const index = client.initIndex(ALGOLIA_INDEX_NAME);

      let product = {}
      product.objectID = productId
      product.title = after.title
      product.description = after.description
      product.group = after.group
      product.category = after.category
      product.price = after.price
      product.originCountry = after.originCountry
      product.material = after.material
      product.brand = after.brand
      product.color = after.color
      product.size = after.size
      product.creationDate = after.creationDate
      product.SKU = after.SKU
      // Write to the algolia index
      return index.saveObject(product, (err) => { // TODO: optimize -> to partialUpdateObject() ?
        if (err) {
          reject(err)
        } else {
          console.log(`Algolia: Object ${productId} updated!`)
          resolve()
        }
      })
    }
  })
}
