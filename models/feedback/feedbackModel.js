const mongoose = require('mongoose')


const feedbackSchema = new mongoose.Schema({
    
    images: {
        type: Object,
        required: true,
    },
    rating: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    product_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'Type'
    },
    user_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'User'
    },
    replyFeedback : {
        type: Array,
      require: true,
      default:[]
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Feedbacks", feedbackSchema)