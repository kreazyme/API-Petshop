const Order = require('../database/models/orderModel');
const OrderItem = require('../database/models/orderItemModel');
const Status = require('../database/models/statusModel');
const User = require('../database/models/userModel');

exports.addOrder = async (req, res) => {
  try {
    if (!req.body.user) {
      res.status(500).send({ message: 'Content can not be empty' });
      return;
    }
    const newOrder = new Order(req.body);
    const saveOrder = await newOrder.save();
    if (req.body.status || req.body.user) {
      const stt = Status.findById(req.body.status);
      const user = User.findById(req.body.user);
      await stt.updateOne({ $push: { orderItem: saveOrder._id } });
      await user.updateOne({ $push: { orderItem: saveOrder._id } });
    }
    if(req.body.orderItem > req.body.amount) {
      return res.status(500).send({ message:"no have order in storage"});
    }
    if(req.body.orderItem){
      const orderItem = OrderItem.findById(req.body.orderItem);
      await orderItem.updateOne({$push: { orderItem: saveOrder._id }})
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
exports.getMyOrder = async (req, res) => {
  try {
    // const orders = await Order.findById(req.params.id)
    //   .populate('status')
    //   .populate('orderItem');
    // const data = await orders.get();
    // const orderArray = [];
    // if (data.empty) {
    //   res.status(500).json('No  have order nhe ong  noi');
    // } else {
    //   for (const doc of data.docs) {
    //     doc.id,
    //       doc.data().status,
    //       doc.data().orderItem,
    //       doc.data().shippingCode,
    //       doc.data().user,
    //       doc.data().timestamps;
    //   }
    //   var orderItem = await Order.findById(req.params.id).get();
    //   orderItem = orderItem.docs.map((doc) => ({
    //     id: doc.id,
    //     ...doc.data(),
    //   }));
    //   const orderItems = [];
    //   for (const r of orderItem) {
    //     const p = await OrderItem.doc(r.orderItem);
    //     const data = await p.get();
    //     const dt = data.data();
    //   }
    // }
    //console.log(order.status)
    const order = await Order.findById(req.params.id)
      .populate('orderItem')
      .populate({ path: 'user', select: 'userName' })
      .populate('status');
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateOrder = async (req, res) => {
  const id = req.params.id;
  const { status, create_at, complete_at, orderItem, shippingCode, user } =
    req.body;
  try {
    const order = await Order.findOne({ _id: id });
    await order.updateOne({ $set: req.body });
    order.status = status;
    order.create_at = create_at;
    order.complete_at = complete_at;
    order.orderItem = orderItem;
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
