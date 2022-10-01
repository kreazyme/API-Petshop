const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  order_item:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Order_item',
  },
  type: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Type',
  },
],
  title: {
    type: String,
    required: true,
  },
  assets: [
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Assets',
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
  },
],
  category:[
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
  },
],
});
module.exports = mongoose.model('Product', productSchema);
