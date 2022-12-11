const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        ref: 'User',
        required: true
    },
    total: {
        type: Number,
        required: true,
        default: 0.0
    },
    listOrderItems: {
        type: Array,
        required: true,
        default: []
    },
    status: {
        type: String,
        ref: 'Status',
        required: true
    },
    address: {
        type: String,
        default: "64 Nguyen Luong Bang",
        required: true
    },
    phone: {
        type: String,
        required: true,
        default: "0123456789"
    },
    delivery: {
        type: String,
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Orders', orderSchema);