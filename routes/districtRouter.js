var express = require('express');
var router = express.Router();
const districtController = require('../controllers/districtController');
router.use(express.json());

// add status
router.post('/', districtController.AddDistrict);
// router.get('/:id', statusController.getStatus);
// router.put('/:id', statusController.updateStt);
// router.delete('/:id', statusController.deleteStt);

module.exports = router;