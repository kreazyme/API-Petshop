const router = require('express').Router()
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const townCtrl = require('../controllers/townCtrl')

router.route('/town')
    .get(townCtrl.getTown)
    .post(auth,authAdmin,townCtrl.createTown)
module.exports = router