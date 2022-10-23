var express = require('express');
var router = express.Router();
const addressController = require('../controllers/addressController');
router.use(express.json());

// add status
router.post('/', addressController.AddAddress);
// router.get('/:id', statusController.getStatus);
// router.put('/:id', statusController.updateStt);
// router.delete('/:id', statusController.deleteStt);

module.exports = router;