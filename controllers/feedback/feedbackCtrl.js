const Feedbacks = require('../../models/feedback/feedbackModel')
const ReplyFeedbacks = require('../../models/feedback/replyFeedbackModel')
const Products = require('../../models/productModel')
const authMe = require('../../middleware/authMe')

const feedbackCtrl = {
    createFeedback: async (req, res) => {
        try {
            const { image_url, rating, content, product_id } = req.body
            const userID = await authMe(req);
            if (!userID) {
                res.status(401).json({ message: "Please login to continue" })
                return;
            }
            const product = await Products.findOne({ _id: product_id })
            if (!product) {
                res.status(400).json({ message: "Product not found" })
                return;
            }
            const feedback = new Feedbacks({
                content: content,
                rating: rating,
                image_url: image_url,
                product_id: product_id,
                user_id: userID,
            })
            await feedback.save()
            res.send(JSON.stringify(feedback))
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ message: "Internal Server" })
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