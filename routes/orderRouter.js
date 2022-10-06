var express = require('express');
var router = express.Router();
const orderController = require('../controllers/orderController');
router.use(express.json());
//   add order


router.post('/', orderController.addOrder);
router.get('/', orderController.getAllOrder);
router.get('/:id', orderController.getMyOrder);
router.put('/:id',orderController.updateOrder);
router.delete('/:id',orderController.deleteOrder);

module.exports = router;