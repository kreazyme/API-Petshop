const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  // order: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Order',
  //     required: true,
  //   },
  // ],
  amount: {
    type: Number,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});
module.exports = mongoose.model('OrderItem', orderItemSchema);
