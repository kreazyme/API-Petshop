const Orders = require('../../models/order/orderModel');

const orderCtrl = {
    createOrder: async (req, res) => {
        try {
            const { user_id, total, address, phone } = req.body;
            const order = await Orders.findOne({ user_id });
            if (order) return res.status(400).json({ msg: "You already have an order." });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getOrdersbyID: async (req, res) => {
        try {
            const id = authMe();
            const orders = await Orders.findById(id);
            res.json(orders)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}

module.exports = orderCtrl