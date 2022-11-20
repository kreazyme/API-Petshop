const paypalCtrl = require('../controllers/order/paypalCtrl')
const router = require('express').Router()

router.route("/paypal").get(paypalCtrl.payment)

module.exports = router