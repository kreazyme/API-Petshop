var express = require('express');
var router = express.Router();
const townController = require('../controllers/townController');
router.use(express.json());

router.post('/', townController.AddTown);
// router.get('/:id', statusController.getStatus);
// router.put('/:id', statusController.updateStt);
// router.delete('/:id', statusController.deleteStt);

module.exports = router;