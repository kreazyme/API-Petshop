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
        default: "Hay dien thong tin day du"
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsY5yMO2TvuWRKwNjTNsnYrogObuRcJ1L8oHmF-g5WGQ&s"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)