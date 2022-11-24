const paypalCtrl = require('../controllers/order/paypalCtrl')
const router = require('express').Router()

router.route("/paypal").get(paypalCtrl.payment)

router.route("/paypal/success").get(paypalCtrl.success)

router.route("/paypal/cancel").get(paypalCtrl.cancel)

module.exports = router