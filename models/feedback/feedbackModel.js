const mongoose = require('mongoose')


const feedbackSchema = new mongoose.Schema({
    feedbackId: {
        type: String
    },
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
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Feedbacks", feedbackSchema)