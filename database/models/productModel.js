const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Type',
  },
  title: {
    type: String,
  },
  assets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assets',
  },
],
  description: {
    type: String,
  },
  feedback: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Feedback',
  },
],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }
});
module.exports = mongoose.model('Product', productSchema);
