const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/products')
    .get(productCtrl.getProducts)
    .put(auth, authAdmin, productCtrl.updateProduct)
    .post(auth, authAdmin, productCtrl.createProduct)

router.route('/products/search')
    .get(productCtrl.searchProduct)


router.route('/products/:id')
    .delete(auth, authAdmin, productCtrl.deleteProduct)
    .get(productCtrl.getDetailProduct)

router.route('/product')
    .get(productCtrl.getProductsByCategory)


module.exports = router