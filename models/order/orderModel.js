const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        ref: 'User',
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        ref: 'Status',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
module.exports = mongoose.model('Orders', orderSchema);