const Order = require('../database/models/orderModel');
const OrderItem = require('../database/models/orderItemModel');
const Status = require('../database/models/statusModel');

exports.AddStatus = async (req, res) => {
  try {
    const newStatus = new Status(req.body);
    const save = await newStatus.save();
    res.status(200).json(save);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getStatus = async (req, res) => {
  try {
    const stt = await Status.findById(req.params.id);
    res.status(200).json(stt);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateStt = async (req, res) => {
    try{
        const stt = await Status.findById(req.params.id);
        await stt.updateOne({$set:req.body});
        res.status(200).json('updated');
    }catch(err){
        res.status(500).json(err);
    }
};
exports.deleteStt = async (req, res) => {
    try{
        await Order.updateMany({status:req.params.id},{status:null});
        await Status.findByIdAndDelete(req.params.id);
        res.status(200).json('deleted')
    }catch(err){
        res.status(500).json(err);
    }
};
