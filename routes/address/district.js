const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')
const districtCtrl = require('../../controllers/address/districtCtrl')

router.route('/district')
    .get(districtCtrl.getDistrict)
    .post(districtCtrl.createDistrict)


module.exports = router