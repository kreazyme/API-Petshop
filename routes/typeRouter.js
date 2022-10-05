const express = require('express');
const router = express.Router();
const typeController =  require('../controllers/typeController');
router.use(express.json());

router.post('/',typeController.addAType);
router.get('/',typeController.getAllType);
router.get('/:id', typeController.getAType);
router.put('/:id', typeController.updateType);
router.delete('/:id',typeController.deleteType);

module.exports = router;