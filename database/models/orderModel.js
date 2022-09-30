const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  },
  create_at: {
    type: Date.now(),
  },
  complete_at: {
    type: Date.now(),
  },
  order_item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order_item',
  },
  shipping_code: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
const order_item = new mongoose.Schema({
  amount: {
    type: Number,
    required:true,
  },
  product:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Product'
  },
});

const status = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
});
let Order = mongoose.model('Order', orderSchema);
let Order_item = mongoose.model('Order_item', order_item);
let Status = mongoose.model('Status', status);

module.exports = { Order , Order_item , Status };
