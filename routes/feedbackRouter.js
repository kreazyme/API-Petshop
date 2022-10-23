var express = require('express');
var router = express.Router();
const feedbackController = require('../controllers/feedbackController');
router.use(express.json());

// add status
router.post('/', feedbackController.addAFeedback);
// router.get('/:id', statusController.getStatus);
// router.put('/:id', statusController.updateStt);
// router.delete('/:id', statusController.deleteStt);

module.exports = router;