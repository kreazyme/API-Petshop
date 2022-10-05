const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
  },
  town: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Town',
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deliveryName: {
    type:String,
    required: true,
  },
});
module.exports = mongoose.model('Address',addressSchema);