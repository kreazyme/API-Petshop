const router = require('express').Router()
const { updateOrder } = require('../controllers/order/orderCtrl')
const orderCtrl = require('../controllers/order/orderCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const authMe = require('../middleware/authMe')

router.route('/orders')
    .get(orderCtrl.getOrdersbyID)
    .post(orderCtrl.createOrder)

router.route('/orders/:id')
    .put(orderCtrl.updateOrder)

router.route('/cart')
    .get(orderCtrl.getCart)
    .put(orderCtrl.addTypeToOrder)

router.route('/history')
    .get(orderCtrl.getMyOrder)
    .put(orderCtrl.getOrdersByTime)

router.route('/cart/checkout')
    .post(orderCtrl.checkoutOrder)

router.route('/delivery')
    .get(orderCtrl.getDelivery)
    .put(orderCtrl.updateDelivery)

module.exports = router