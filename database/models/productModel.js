const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  type: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type',
    required: true,
  },
],
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },

  assets: [
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Assets',
    required: true,
  },
],
  description: {
    type:String,
    required:true,
  },
  feedback:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Feedback',
    required: true,
  },
],
  category:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required: true,
  },
],
});
module.exports = mongoose.model('Product', productSchema);
