const mongoose = require('mongoose')


const replyFeedbackSchema = new mongoose.Schema({
    images: {
        type: Object,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'User'
    },
}, {
    timestamps: true
})


module.exports = mongoose.model("ReplyFeedbacks", replyFeedbackSchema)