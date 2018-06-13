const productHandlers = require('algoliasearch');
// DON'T FORGET SEE WHAT PRODUCT UPDATED AFTER CREATION!
exports.handler = function (change, context) {
    console.log(CONST.LOG_DELIMITER)
    let after = change.after.data()
    let before = change.before.data()
    let productId = context.params.productId
    return new Promise((resolve, reject) => {
        const client = productHandlers(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
        const index = client.initIndex(ALGOLIA_INDEX_NAME);

        let product = after;
        product.objectID = productId
        delete product.productId
        delete product.img_0
        delete product.img_1
        delete product.img_2
        delete product.img_3
        delete product.img_4
        delete product.qty

        // Write to the algolia index
        return index.saveObject(product, (err) => { // TODO: optimize -> to partialUpdateObject() ?
            if (err) {
                reject(err)
            } else {
                console.log(`Algolia: Object ${productId} updated!`)
                resolve()
            }
        })
    })
}
