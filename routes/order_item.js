const express = require('express');
const router = express.Router();
const order_itemController = require('../controllers/Order_itemController');

router.use(express.json());

router.post('/',order_itemController.addOrder_item);
router.get('/:id',order_itemController.getOrder_item);

module.exports = router;