const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')
const provinceCtrl = require('../../controllers/address/province')

router.route('/province')
    .get(provinceCtrl.getProvince)
    .post(auth,authAdmin,provinceCtrl.createProvince)


module.exports = router