const Type = require('../models/typeModel');
const Products = require('../models/productModel');

const typeCtrl = {
  getTypes: async (req, res) => {
    try {
      const types = await Type.find();
      res.json(types);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createType: async (req, res) => {
    try {
      const type = new Type(req.body);
      const save = await type.save();
      if (req.body.product) {
        const product = Products.findById(req.body.product);
        await product.updateOne({ $push: { types: save._id } });
      }
      res.status(200).json({ msg: 'Đã tạo thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = typeCtrl;
