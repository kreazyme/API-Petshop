const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userId: String,
    password: String,
    name: String,
    role: Boolean,
}, {
    timestamps: true
})
module.exports = mongoose.model("User", userSchema)