const express = require('express');
const router = express.Router();
const categoryController =  require('../controllers/categoryController');
router.use(express.json());

router.post('/',categoryController.addACategory);
router.get('/',categoryController.getAllCategory);
router.get('/:id', categoryController.getACategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id',categoryController.deleteCategory);

module.exports = router;