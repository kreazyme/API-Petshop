const router = require('express').Router()
const auth = require('../../middleware/auth')
const authAdmin = require('../../middleware/authAdmin')
const townCtrl = require('../../controllers/address/townCtrl')

router.route('/town')
    .get(townCtrl.getTown)
    .post(auth,authAdmin,townCtrl.createTown)
router.route('/town/:id')
    .delete(auth,authAdmin,townCtrl.deleteTown)
    .put(auth,authAdmin,townCtrl.updateTown)


module.exports = router