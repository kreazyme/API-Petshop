const Type = require('../database/models/typeModel');
const Products = require('../database/models/productModel');

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
