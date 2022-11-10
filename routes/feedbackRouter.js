const router = require('express').Router()
const feedbackCtrl = require('../controllers/feedback/feedbackCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/feedback/create')
    .post(feedbackCtrl.createFeedback)

router.route('feedback/getFeedback')
    .get(feedbackCtrl.getFeedbackByProductID)

module.exports = router