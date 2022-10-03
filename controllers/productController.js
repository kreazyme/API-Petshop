const Order = require('../database/models/orderModel');
const OrderItem = require('../database/models/orderItemModel');
const Status = require('../database/models/statusModel');
const Product = require('../database/models/productModel');

exports.AddProduct= async (req, res)=>{
    try {
        const newProduct = new Product(req.body);
        const save = await newProduct.save();
        res.status(200).json(save);
      } catch (err) {
        res.status(500).json(err);
      }
};
exports.getAProduct = async (req, res) => {
  try{

  }catch(err){
    res.status(500).json(err);
  }
}