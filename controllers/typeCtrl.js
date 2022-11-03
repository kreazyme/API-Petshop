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
    
  },
};

module.exports = typeCtrl;
