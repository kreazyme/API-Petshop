const Orders = require('../../models/order/orderModel');
const OrderItems = require('../../models/order/orderItemModel');
const Products = require('../../models/productModel');
const typeCtrl = require('../typeCtrl');
const authMe = require('../../middleware/authMe');
const jwt = require('jsonwebtoken');

const orderCtrl = {
    createOrder: async (req, res) => {
        try {
            const { orderItems, address, phone } = req.body;
            const user_id = await authMe(req);
            const order = Orders({
                user_id: user_id,
                status: 'Pending',
                address: address,
                phone: phone,
            });
            order.save();
            let price = 0;
            for (let item = 0; item < orderItems.length; item++) {
                const productItem = await Products.findOne({ product_id: orderItems[item].product_id });
                if (productItem) {
                    const orderItem = OrderItems({
                        order_id: order._id,
                        product_id: orderItems[item].product_id,
                        amount: orderItems[item].amount,
                        type_id: orderItems[item].type_id,
                    });
                    const itemPrice = await typeCtrl.getPricebyId(orderItems[item].type_id);
                    if (itemPrice === 0) {
                        res.send({ msg: "Wrong type id" });
                        return;
                    }
                    const itemAmount = await typeCtrl.getAmountbyId(orderItems[item].type_id);
                    if (itemAmount === 0) {
                        res.send({ msg: "Number of products available is zero" });
                        return;
                    }
                    console.log(itemPrice);
                    price += itemPrice * orderItems[item].amount;
                    orderItem.save();
                }
            }
            order.total = price;
            order.save();
            res.send({ message: "Order created successfully", order: order });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getOrdersbyID: async (req, res) => {
        try {
            console.log(req.user?.id);
            const id = await authMe();
            console.log(id);
            const orders = await Orders.findById(id);
            // res.json(orders)
            res.send({ order: JSON.stringify(orders) });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateOrder: async (req, res) => {
        try {
            const { user_id, orderItems, address, phone } = req.body;
            await Orders.findOneAndUpdate({ _id: req.params.id }, {
                user_id, orderItems, address, phone
            })

            let price = 0;
            for (let item = 0; item < orderItems.length; item++) {
                const productItem = await Products.findOne({ product_id: orderItems[item].product_id });
                if (productItem) {

                    const orderItem = OrderItems({
                        order_id: req.params.id,
                        product_id: orderItems[item].product_id,
                        amount: orderItems[item].amount,
                        type_id: orderItems[item].type_id,
                    });
                    const itemPrice = await typeCtrl.getPricebyId(orderItems[item].type_id);
                    if (itemPrice === 0) {
                        res.send({ msg: "Wrong type id" });
                        return;
                    }
                    const itemAmount = await typeCtrl.getAmountbyId(orderItems[item].type_id);
                    if (itemAmount === 0) {
                        res.send({ msg: "Number of products available is zero" });
                        return;
                    }
                    console.log(itemPrice);
                    console.log(itemAmount);
                    price += itemPrice * orderItems[item].amount;
                    orderItem.save();
                }
            }

            await Orders.findOneAndUpdate({ _id: req.params.id }, {
                user_id, orderItems, address, phone, total: price
            })
            res.send({ message: "Order update successfully" });
        }
        catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = orderCtrl