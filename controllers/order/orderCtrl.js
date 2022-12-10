const Orders = require('../../models/order/orderModel');
const OrderItems = require('../../models/order/orderItemModel');
const Products = require('../../models/productModel');
const typeCtrl = require('../typeCtrl');
const Type = require('../../models/typeModel');
const authMe = require('../../middleware/authMe');
const productCtrl = require('../productCtrl');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
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
            const userID = await authMe(req);
            const user = User.findById(userID);
            var order = await Orders.findOne({ user_id: userID, status: 'Pending' });
            if (!order) {
                order = Orders({
                    user_id: userID,
                    status: 'Pending',
                    address: user.address ?? "Address",
                    phone: user.phone ?? "0123456789"
                });
            }
            if (order.status == 'Pending') {
                var product;
                try {
                    product = await Products.findById(product_id);
                }
                catch (err) {
                    res.send({ message: "Product not found" });
                }
                if (product) {
                    for (var i = 0; i < product.types.length; i++) {
                        if (type_id == product.types[i]._id) {

                            if (amount > product.types[i].amount) {
                                res.status(400).json({ message: "Not enough amount" });
                                return;
                            }
                            else if (amount <= 0) {
                                res.status(400).send({ message: "Amount must be greater than 0" });
                                return;
                            }
                            else {
                                for (var j = 0; j < order.listOrderItems.length; j++) {
                                    if (order.listOrderItems[j].type_id == type_id && order.listOrderItems[j].product_id == product_id) {

                                        //amount
                                        if (order.listOrderItems[j].amount + amount > product.types[i].amount) {
                                            res.status(400).send({ message: "Not enough amount" });
                                            return;
                                        }
                                        order.listOrderItems[j].amount += amount;
                                        product.types[i].amount = product.types[i].amount - amount;
                                        await Products.findByIdAndUpdate(product_id, { types: product.types });

                                        //price
                                        let price = 0;
                                        order.listOrderItems.forEach((item) => {
                                            price += item.amount * item.price;
                                        });
                                        order.total = price;

                                        //save
                                        await Orders.findByIdAndUpdate(order._id, { listOrderItems: order.listOrderItems, total: order.total });
                                        res.send(JSON.stringify(order));
                                        return;
                                    }
                                }


                                //types
                                var itemType = {
                                    product_id: product_id,
                                    type_id: type_id,
                                    amount: amount,
                                    image: product.images.url,
                                    product_name: product.title,
                                    price: product.types[i].price,
                                    type_name: product.types[i].name
                                }
                                listType = order.listOrderItems;
                                listType.push(itemType);
                                order.listOrderItems = listType;

                                //amount
                                if (product.types[i].amount < amount) {
                                    res.status(400).send({ message: "Not enough amount" });
                                    return;
                                }
                                product.types[i].amount = product.types[i].amount - amount;

                                //price
                                let price = 0;
                                order.listOrderItems.forEach((item) => {
                                    price += item.amount * item.price;
                                });
                                order.total = price;

                                //save
                                await Products.findByIdAndUpdate(product_id, { types: product.types });
                                await Orders.findByIdAndUpdate(order._id, { listOrderItems: order.listOrderItems, total: order.total });

                                res.send(JSON.stringify(order));
                            }
                            return;
                        }
                    }
                    res.send({ message: "Wrong type id" });
                }
                else {
                    return;
                }
            }
            else {
                res.status(400).send({ message: "Order is not pending" });
                return;
            }
        } catch (err) {
            console.log(err)
            console.log("Error: ", err.message)
        }
    },
    getCart: async (req, res) => {
        try {
            const userID = await authMe(req);
            const order = await Orders.findOne({ user_id: userID, status: 'Pending' });
            res.send(JSON.stringify(order));
        }
        catch (err) {
            res.status(400).json({ message: "Internal Server Error" })
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
    getOrdersByTime: async (req, res) => {
        try {
            const { start, end } = req.body;
            const userID = await authMe(req);
            var endDate, startDate;
            try {
                endDate = new Date(end);
                startDate = new Date(start);
            }
            catch (err) {
                res.send({ message: "Wrong date format" });
                return;
            }
            const orders = await Orders.find({
                createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
                user_id: userID,
                status: "Paid"
            }, {
                createdAt: 1,
                total: 1,
                status: 1,
                listOrderItems: 1
            });
            res.send(orders);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ msg: err.message });
        }
    },

}

module.exports = orderCtrl