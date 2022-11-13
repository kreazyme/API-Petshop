const mongoose = require('mongoose');

const addrSchema = new mongoose.Schema(
  {
    nameCustomer:{
      type:String,
      required:true
    },
    province: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    town: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    delivery: {
        type: String,
        //required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Address', addrSchema);
