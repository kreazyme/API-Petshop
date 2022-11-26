const mongoose = require('mongoose')


const feedbackSchema = new mongoose.Schema({

    image_url: {
        type: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Feedbacks", feedbackSchema)