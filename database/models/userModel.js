const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: Boolean,
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },  
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);
