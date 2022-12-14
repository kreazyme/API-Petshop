const Feedbacks = require("../../models/feedback/feedbackModel");
const Products = require("../../models/productModel");
const authMe = require("../../middleware/authMe");
const User = require("../../models/userModel");

const feedbackCtrl = {
  createFeedback: async (req, res) => {
    try {
      const { image_url, rating, content, product_id } = req.body;
      const userID = await authMe(req);
      if (!userID) {
        res.status(401).json({ message: "Please login to continue" });
        return;
      }
      const product = await Products.findOne({ _id: product_id });
      if (!product) {
        res.status(400).json({ message: "Product not found" });
        return;
      }
      const user = await User.findOne({ _id: userID }, { name: 1, _id: 1 });
      const feedback = new Feedbacks({
        content: content,
        rating: rating,
        image_url: image_url,
        product_id: product_id,
        username: user.name,
        user_id: user._id,
      });
      await feedback.save()
      res.send(JSON.stringify(feedback));

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server" });
    }
  },
  getFeedbackByProductID: async (productId) => {
    try {
      const feedbacks = await Feedbacks.find({ product_id: productId });
      return feedbacks;
    } catch (error) {
      return 0;
    }
  },
};
module.exports = feedbackCtrl;
