const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    product:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Type', typeSchema);
