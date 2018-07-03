const productHandlers = require('algoliasearch');
// DON'T FORGET SEE WHAT PRODUCT UPDATED AFTER CREATION!
exports.handler = function (change, context) {
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
            after.SKU === before.SKU &&
            after.img_0 === before.img_0 &&
            after.productId === before.productId // after add product it has been updated with new field - productId
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
            product.SKU = after.SKU
            product.thumbnail = after.img_0 && after.img_0.thumbnail ? after.img_0.thumbnail : ''
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
