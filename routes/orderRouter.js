var express = require('express');
var router = express.Router();
const orderController = require('../controllers/orderController');
router.use(express.json());
//   add order


router.post('/', orderController.addOrder);

module.exports = router;