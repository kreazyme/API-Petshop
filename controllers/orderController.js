const Order = require('../database/models/orderModel');
const Order_item = require('../database/models/order_itemModel');
const Status = require('../database/models/statusModel');

exports.addOrder =  async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      const saveOrder = await newOrder.save();
      res.status(200).json(saveOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  };


