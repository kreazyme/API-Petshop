const Orders = require('../../models/order/orderModel');
const OrderItems = require('../../models/order/orderItemModel');
const Products = require('../../models/productModel');
const typeCtrl = require('../typeCtrl');
const Type = require('../../models/typeModel');
const authMe = require('../../middleware/authMe');
const productCtrl = require('../productCtrl');
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
            await order.save();
            let price = 0;
            for (let item = 0; item < orderItems.length; item++) {
                const productItem = await Products.findOne({ _id: orderItems[item].product_id });
                if (productItem) {
                    const orderItem = new OrderItems({
                        order_id: order._id,
                        product_id: orderItems[item].product_id,
                        amount: orderItems[item].amount,
                        type_id: orderItems[item].type_id,
                    });
                    const type = productItem.types;
                    type.forEach((i) => {
                        if (i._id == orderItems[item].type_id) {
                            amount = i.amount - orderItems[item].amount;
                            if (amount < 0) {
                                throw new RangeError("Not enought amount");
                            }
                            else {
                                price += orderItems[item].amount * i.price;
                                i.amount = amount;
                            }
                        }
                    });
                    await Products.findByIdAndUpdate(productItem._id, { types: type });
                    await orderItem.save();
                }
                else {
                    throw new Error("Product not found");
                }
            }
            order.total = price;
            await order.save();
            res.send({ message: "Order created successfully", order: order });
        }
        catch (err) {
            console.log("Error: ", err.message)
            if (err instanceof RangeError) {
                res.status(400).send({ message: err.message });
            }
            else
                return res.status(500).json({ message: err.message });
        }
    },
    getOrdersbyID: async (req, res) => {
        try {
            console.log(req.user?.id);
            const id = await authMe();
            console.log(id);
            const orders = await Orders.findById(id);
            res.send({ order: JSON.stringify(orders) });
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getOrders: async (req, res) => {
        try {
            const user_id = await authMe(req);
            console.log(user_id);
            const orders = await Orders.find({ user_id: user_id });
            res.send(orders)
        } catch (err) {
            console.log(err);
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
                    price += itemPrice * orderItems[item].amount;
                    await orderItem.save();
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