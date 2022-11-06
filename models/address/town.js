const mongoose = require('mongoose')


const townSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Town", townSchema)