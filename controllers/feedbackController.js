const Feedback = require('../database/models/feedbackModel');
const User = require('../database/models/userModel')
const FeedbackReply= require('../database/models/feedbackReplyModel')

//const authMiddleware = require('../auth/auth.middlewares');

//const isAuth = authMiddleware.isAuth;

exports.addAFeedback=  async (req, res)=>{
//   if(){}
        const newFeedback = new Feedback(req.body);
        const saveFeedback = await newFeedback.save();
    try{
        if (req.body.feedbackReply || req.body.user) {
            const feedbackReply = FeedbackReply.findById(req.body.feedbackReply);
            const user = User.findById(req.body.user);
           
            await feedbackReply.updateOne({ $push: { newFeedback: saveFeedback._id } });
            await user.updateOne({ $push: { newFeedback: saveFeedback._id } });
          }

        res.status(200).send(saveFeedback);
        }catch(err){
            res.status(500).json(err);
        }
       
    
};