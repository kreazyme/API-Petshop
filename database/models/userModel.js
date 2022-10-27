const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    order: {
      type: Array,
      default: [],
    },
    address: {
      type: Number,
      default: '',
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
