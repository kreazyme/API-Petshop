const router = require('express').Router()
const feedbackCtrl = require('../controllers/feedback/feedbackCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')


router.route('/create')
    .post(feedbackCtrl.createFeedback)

router.route('/getFeedback')
    .get(feedbackCtrl.getFeedbackByProductID)

module.exports = router