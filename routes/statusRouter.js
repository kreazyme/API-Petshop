var express = require('express');
var router = express.Router();
const statusController = require('../controllers/statusController');
router.use(express.json());

// add status
router.post('/', statusController.AddStatus);
router.get('/:id', statusController.getStatus);
router.put('/:id', statusController.updateStt);
router.delete('/:id', statusController.deleteStt);

module.exports = router;

