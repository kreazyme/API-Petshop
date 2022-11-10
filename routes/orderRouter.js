const router = require('express').Router()
const orderCtrl = require('../controllers/order/orderCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/orders')
    .get(auth, orderCtrl.getOrdersbyID)

module.exports = router