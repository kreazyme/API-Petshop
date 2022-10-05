const mongoose = require('mongoose');
const feedbackReplySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    description:{
        type:String,
        required:true,
    },

},{
    timestamps: true,
});

module.exports = mongoose.model('feedbackReply',feedbackReplySchema);
