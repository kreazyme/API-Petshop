const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    productId: Number,
    title: String,
    description: String,
}, {
    timestamps: true
})
module.exports = mongoose.model("Product", userSchema)