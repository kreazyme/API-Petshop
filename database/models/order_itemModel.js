const mongoose = require('mongoose');

const order_itemSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required:true,
    },
    product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Product'
    },
  });
module.exports = mongoose.model("Order_item", order_itemSchema);