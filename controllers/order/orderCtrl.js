const Orders = require('../../models/order/orderModel');
const OrderItems = require('../../models/order/orderItemModel');
const Products = require('../../models/productModel');
const typeCtrl = require('../typeCtrl');
const Type = require('../../models/typeModel');
const authMe = require('../../middleware/authMe');
const productCtrl = require('../productCtrl');
const jwt = require('jsonwebtoken');
const paypalCtrl = require('../order/paypalCtrl');

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
            let listOrderItems = [];
            for (let item = 0; item < orderItems.length; item++) {
                const productItem = await Products.findOne({ _id: orderItems[item].product_id });
                if (productItem) {
                    const type = productItem.types;
                    type.forEach((i) => {
                        if (i._id == orderItems[item].type_id) {
                            amount = i.amount - orderItems[item].amount;
                            if (orderItems[item].amount < 0) {
                                res.status(400).json({ msg: "Amount is invalid" });
                                return;
                            }
                            listOrderItems.push({
                                product_id: orderItems[item].product_id,
                                type_id: orderItems[item].type_id,
                                amount: orderItems[item].amount,
                                image: productItem.images.url
                            })
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
                }
                else {
                    throw new Error("Product not found");
                }
            }
            order.listOrderItems = listOrderItems;
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
    addTypeToOrder: async (req, res) => {
        try {
            const { product_id, type_id, amount } = req.body;
            const order = await Orders.findOne({ _id: req.params.id });
            if (order) {
                if (order.status == 'Pending') {
                    const product = await Products.findOne({ _id: product_id });
                    if (product) {
                        if (product.amount < amount) {
                            res.status(400).send({ message: "Product not enough" });
                            return;
                        }
                        else if (amount <= 0) {
                            res.status(400).send({ message: "Amount must be greater than 0" });
                            return;
                        }
                        else {
                            var itemType = {
                                product_id: product_id,
                                type_id: type_id,
                                amount: amount,
                                image: product.images.url
                            }
                            listType = { ...order.listOrderItems, itemType };
                            order.listOrderItems = listType;
                            await order.save();
                            res.send(JSON.stringify(order));
                        }
                    }
                    else {
                        res.status(400).send({ message: "Product not found" });
                        return;
                    }
                }
                else {
                    res.status(400).send({ message: "Order is not pending" });
                    return;
                }
            }
            else {
                res.status(400).send({ message: "Order not found" });
                return;
            }
        } catch (err) {
            console.log("Error: ", err.message)
        }
    },
    getOrdersbyID: async (req, res) => {
        try {
            const id = await authMe(req);
            const orders = await Orders.find({ user_id: id });
            res.send(JSON.stringify(orders));
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getOrders: async (req, res) => {
        try {
            const user_id = await authMe(req);
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
    },
    checkoutOrder: async (req, res) => {
        const { order_id } = req.body;
        const order = await Orders.findOne({ _id: order_id });
        if (!order) {
            return res.status(400).send({ message: "Order not found" });
        }
        else {
            const amount = order.total;
            const address = order.address;
            await paypalCtrl.payment(res, amount, address, order_id);
        }
    },
    checkoutOrderSuccess: async (req, res) => {
        const order_id = req.params.id;
        await Orders.findOneAndUpdate({ _id: order_id }, {
            status: "Success"
        }, (err, doc) => {
            if (err) {
                res.send({ message: "Something went wrong" })
            }
            else {
                res.send({ message: "Order update successfully" });
            }
        })
    },
    checkoutOrderFail: async (req, res) => {
        const { order_id } = req.body;
        await Orders
            .findOneAndUpdate({ _id: order_id }, {
                status: "Fail"
            })
        res.send({ message: "Order update not successfully" });
    },

}

module.exports = orderCtrl