const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  },
  create_at: {
    type: Date,
  },
  complete_at: {
    type: Date,
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
module.exports = mongoose.model("Order", orderSchema);
