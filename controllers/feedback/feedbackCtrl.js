const Feedbacks = require('../../models/feedback/feedbackModel')

const feedbackCtrl = {
    createFeedback: async (req, res) => {
        try {
            const { images, rating, content, productId } = req.body
            const feedback = new Feedbacks({
                content: content,
                rating: rating,
                images: images,
                product_id: productId ?? "12"
            })
            await feedback.save()
            res.send(JSON.stringify(feedback))
        }
        catch (error) {
            console.log(error)
        }
    },
    getFeedbackByProductID: async (req, res) => {
        try {
            const { productId } = req.body
            const feedbacks = await Feedbacks.find({ product_id: productId })
            res.send(JSON.stringify(feedbacks))
        }
        catch (error) {
            res.send(JSON.stringify(error))
        }
    }
}
module.exports = feedbackCtrl