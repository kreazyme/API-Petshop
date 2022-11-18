const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    types: {
      type: Array,
      require: true,
      default:[]
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    feedbacks: {
      type: Array,
      default:[]
    },
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("Products", productSchema);
