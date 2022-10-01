const Order = require('../database/models/orderModel');
const Order_item = require('../database/models/order_itemModel');
const Status = require('../database/models/statusModel');
const Product = require('../database/models/productModel');

exports.addOrder_item = async (req, res) => {
  try {
    const newOrder_item = new Order_item(req.body);
    const saveOrder_item = await newOrder_item.save();
    if (req.body.product) {
      const product = Product.findById(req.body.product);
      await product.updateOne({ $push: { order_item: saveOrder_item._id } });
    }
    res.status(200).json(saveOrder_item);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getOrder_item = async (req, res) => {
    try {
      const order_item = await Order_item.findById(req.params.id).populate('product');
      //console.log(order.status)
      res.status(200).json(order_item);
    } catch (err) {
      res.status(500).json(err);
    }
  };
