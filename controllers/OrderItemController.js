const Order = require('../database/models/orderModel');
const OrderItem = require('../database/models/orderItemModel');
const Status = require('../database/models/statusModel');
const Product = require('../database/models/productModel');

exports.addOrderItem = async (req, res) => {
  try {
    const newOrderItem = new OrderItem(req.body);
    const saveOrderItem = await newOrderItem.save();
    if (req.body.product) {
      const product = Product.findById(req.body.product);
      await product.updateOne({ $push: { orderItem: saveOrderItem._id } });
    }
    res.status(200).json(saveOrderItem);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getOrderItem = async (req, res) => {
    try {
      const orderItem = await OrderItem.findById(req.params.id).populate('product');
      //console.log(order.status)
      res.status(200).json(orderItem);
    } catch (err) {
      res.status(500).json(err);
    }
  };
