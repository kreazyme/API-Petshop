const mongoose = require('mongoose');
const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // assets: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Assets',
  // },
  feedbackReply: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'FeedbackReply',
    required: false
  },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Feedback',feedbackSchema);
