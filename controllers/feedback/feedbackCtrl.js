const Feedbacks = require('../../models/feedback/feedbackModel')
const ReplyFeedbacks = require('../../models/feedback/replyFeedbackModel')

const feedbackCtrl = {
    createFeedback: async (req, res) => {
        try {
            const { images, rating, content, productId,userId,replyFeedbacks } = req.body
            var listReplyFeedback = [];
        //if(replyFeedbacks){
          for (var i = 0; i < replyFeedbacks.length; i++) {
            const replyFeedbackItem = new ReplyFeedbacks({
              content: replyFeedbacks[i].content,
              images: replyFeedbacks[i].images,
              user_id: replyFeedbacks[i].userId
            });
            listReplyFeedback.push(replyFeedbackItem);
          }
        //}
        console.log(listReplyFeedback);
            const feedback = new Feedbacks({

                content: content,
                rating: rating,
                images: images,
                product_id: productId,
                user_id: userId,
                replyFeedbacks: listReplyFeedback
            })
            await feedback.save()
            res.send(JSON.stringify(feedback))
        }
        catch (error) {
            console.log(error)
        }
    },
    getFeedbackByProductID: async (productId) => {
        try {
            const feedbacks = await Feedbacks.find({ product_id: productId })
           return feedbacks;
        }
        catch (error) {
           return 0;
        }
    }
    
}
module.exports = feedbackCtrl