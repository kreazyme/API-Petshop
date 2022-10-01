var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
router.use(express.json());

router.post('/',productController.AddProduct );

module.exports = router;