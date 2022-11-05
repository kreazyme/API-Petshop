const router = require('express').Router();
const typeCtrl = require('../controllers/typeCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
// admin add type moi dc nha con cho
router
  .route('/type')
  .get(typeCtrl.getTypes)
  .post(auth,authAdmin,typeCtrl.createType);

module.exports = router;
