const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
    required: true,
  },
  orderItem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
    required: true,
  },
],
  shippingCode: {
    type: String,
    required: true,
  },
  user:[ 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
],
  timestamps: true,

});
module.exports = mongoose.model("Order", orderSchema);
