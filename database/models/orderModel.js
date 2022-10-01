const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Status',
  },
  create_at: {
    type: String,
  },
  complete_at: {
    type: String,
  },
  orderItem: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem',
  },
],
  shipping_code: {
    type: String,
    //required: true,
  },
  user:[ 
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
],
});
module.exports = mongoose.model("Order", orderSchema);
