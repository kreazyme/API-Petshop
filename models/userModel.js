const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
    },
    cart: {
        type: Array,
    },
    sex: {
        type: Boolean,
        default: true
    },
    fullName: {
        type: String,
    },
    birthday: {
        type: Date,
    },
    pet: {
        type: Array,
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)