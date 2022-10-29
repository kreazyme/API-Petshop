const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true,"Hãy điền thông tin"],
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true,"Hãy điền thông tin"],
      trim: true,
    },
    password: {
      type: String,
      required: [true,"Hãy điền thông tin"],
    },
    role: {
      type: Number,
      default: 0, // 0 = user , 1=admin
    },
    order: {
      type: Array,
      default: [],
    },
    address: {
      type: Number,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
