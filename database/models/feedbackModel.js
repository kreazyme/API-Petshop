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
  assets: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assets',
  },
  reply: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Reply',
  },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Feedback',feedbackSchema);
