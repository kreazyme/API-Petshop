const Order = require('../database/models/orderModel');
const OrderItem = require('../database/models/orderItemModel');
const Status = require('../database/models/statusModel');
const User = require('../database/models/userModel');
const Product = require('../database/models/productModel');

exports.addOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  // check product and orderitem va amount ==?
  const OrderItems = req.body.OrderItems;
  //console.log('body ', req.body);
  for (const orderItem of OrderItems) {
    const product = await Product.findOne({ _id: orderItem.productId });
    console.log('product', product);
    if (product.amount < orderItem.amount) {
      return res
        .status(500)
        .json({ status: 'failure', message: 'out of stock' });
    }
  }

  const responseData = {};
  const saveOrder = await newOrder.save();
  responseData.order = saveOrder;
  responseData.orderItem = [];

  for (const orderItem of OrderItems) {
    const product = await Product.findOne({ _id: orderItem.productId });
    product.amount = product.amount - orderItem.amount;
    await product.save();

    orderItem.orderId = saveOrder._id;
    orderItem.productId = undefined;
    orderItem.product = product;

    const newOrderItem = await OrderItem.create(orderItem);
    saveOrder.orderItems.push(newOrderItem);
  }
  await saveOrder.save();
  res.status(200).json({ status: 'success', data: responseData });
};

exports.getAllOrder = async (req, res) => {
  try {
    const allOrder = await Order.find();
    res.status(200).json(allOrder);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('status')
    .populate({ path: 'orderItems', populate: {path:'product'}});
  // .populate("product");
  //console.log(order.status)
  res.status(200).json(order);
    
};
exports.updateOrder = async (req, res) => {
  const id = req.params.id;
  const { status, create_at, complete_at, shippingCode, user } =
    req.body;
  try {
    const order = await Order.findOne({ _id: id });
    await order.updateOne({ $set: req.body });
    order.status = status;
    order.create_at = create_at;
    order.complete_at = complete_at;
    order.shippingCode = shippingCode;
    order.user = user;
    const updateordered = await order.save();
    return res.status(200).json({
      order: updateordered,
    });
  } catch (err) {}
};

exports.deleteOrder = async (req, res) => {
  try {
    await Status.updateMany(
      { order: req.params.id },
      { $pull: { order: req.params.id } }
    );
    await OrderItem.updateMany(
      { order: req.params.id },
      { $pull: { order: req.params.id } }
    );
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json('Deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};
