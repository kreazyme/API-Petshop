var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
router.use(express.json());

router.post('/addProduct', productController.AddProduct);

router.get("/allProduct", productController.getAllProduct)

router.get("/:id", productController.getProduct)

router.put("/:id", productController.updateProduct)

router.delete("/:id", productController.deleteProduct)


module.exports = router;