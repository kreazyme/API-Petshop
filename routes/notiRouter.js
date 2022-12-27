const notiCtrl = require('../controllers/notiCtrl')
const authAdmin = require('../middleware/authAdmin')

const router = require('express').Router()

router.route('/notification')
    .post(notiCtrl.pushNoti)

module.exports = router