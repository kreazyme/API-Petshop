const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
  {
    status: {
      type: Number,
      default: 1,
    },
    shippingCode: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
      },
    ],
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Order', orderSchema);
