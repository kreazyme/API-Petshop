var express = require('express');
var router = express.Router();
const proviceController = require('../controllers/proviceController');
router.use(express.json());

// add status
router.post('/', proviceController.AddProvice);
// router.get('/:id', statusController.getStatus);
// router.put('/:id', statusController.updateStt);
// router.delete('/:id', statusController.deleteStt);

module.exports = router;