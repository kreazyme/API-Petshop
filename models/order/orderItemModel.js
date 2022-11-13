const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    order_id: {
        type: String,
        ref: 'Order',
        required: true
    },
    product_id: {
        type: String,
        ref: 'Product',
        required: true
    },
    type_id: {
        type: String,
        ref: 'Type',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model('OrderItems', orderItemSchema);