const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    name: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true
    },
    role: Boolean,
}, {
    timestamps: true
})
module.exports = mongoose.model("User", userSchema)