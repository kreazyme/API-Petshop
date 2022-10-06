var express = require('express');
var router = express.Router();
const typeController = require('../controllers/typeController');
router.use(express.json());

// add status
router.post('/', typeController.AddType);
router.get('/:id', typeController.getType);
router.put('/:id', typeController.updateType);
router.delete('/:id', typeController.deleteType);

module.exports = router;