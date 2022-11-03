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
    product:{
        type:String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Type', typeSchema);
