const mongoose = require('mongoose');
const assetSchema = new mongoose.Schema(
  {
    image: {
      data:Buffer,
      contentType:String
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = assetsModel = mongoose.model('Assets', assetSchema);
