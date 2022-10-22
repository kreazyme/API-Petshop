var express = require('express');
var router = express.Router();
const feedbackReplyController = require('../controllers/feedbackReplyController');
router.use(express.json());

// add status
router.post('/', feedbackReplyController.addAFeedbackReply);
// router.get('/:id', statusController.getStatus);
// router.put('/:id', statusController.updateStt);
// router.delete('/:id', statusController.deleteStt);

module.exports = router;

