const Order = require('../database/models/orderModel');
const OrderItem = require('../database/models/orderItemModel');
const Status = require('../database/models/statusModel');

exports.addOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saveOrder = await newOrder.save();
    if (req.body.status || req.body.orderItem) {
      const stt = Status.findById(req.body.status);
      const orderItem = OrderItem.findById(req.body.orderItem);
      await orderItem.updateOne({ $push: { order: saveOrder._id } });
      await stt.updateOne({ $push: { order: saveOrder._id } });
    }
    res.status(200).json(saveOrder);
  } catch (err) {
    res.status(500).json(err);
  }
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
  try {
    const order = await Order.findById(req.params.id)
      .populate('status')
      .populate('orderItem');
    //console.log(order.status)
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateOrder = async (req, res) => {
  const id = req.params.id;
  const {status,create_at,complete_at,orderItem,shipping_code,user} = req.body;
  try {
    const order = await Order.findOne({_id:id});
    await order.updateOne({ $set: req.body });
    order.status = status;
    order.create_at = create_at;
    order.complete_at = complete_at;
    order.orderItem = orderItem;
    order.shipping_code = shipping_code;
    order.user = user;
    const updateordered = await order.save();
    return res.status(200).json({
        order :  updateordered
    });
  } catch (err) {
    
  }
};

exports.deleteOrder = async (req, res)=>{
  try{
    await Status.updateMany(
      {order: req.params.id},
      {$pull:{order:req.params.id}}
    );
    await OrderItem.updateMany(
      {order:req.params.id},
      {$pull:{order:req.params.id}}
    );
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  }catch(err){
    res.status(500).json(err);
  }
};
