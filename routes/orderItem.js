const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/OrderItemController');

router.use(express.json());

router.post('/',orderItemController.addOrderItem);
router.get('/:id',orderItemController.getOrderItem);

module.exports = router;