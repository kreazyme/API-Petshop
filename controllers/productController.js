const Product = require('../database/models/productModel');
const Type = require('../database/models/typeModel');
const Assets = require('../database/models/assetsModel');
const Category = require('../database/models/categoryModel');


exports.AddProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    if (req.body.type || req.body.assets || req.body.category) {
      const type = Type.findById(req.body.type);
      const assets = Assets.findById(req.body.assets);
      const category = Category.findById(req.body.category);
      await type.updateOne({ $push: { product: saveProduct._id } });
      await assets.updateOne({ $push: { product: saveProduct._id } });
      await category.updateOne({ $push: { product: saveProduct._id } });
    }
    res.status(200).json(saveProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getAllProduct = async (req, res) => {
  try {

  } catch (err) {
    res.status(500).json(err);
  }
}
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const {type,title,assets,description, feedback,category} = req.body;
  try {
    const product = await Product.findOne({_id:id});
    await product.updateOne({ $set: req.body });
    product.type = type;
    product.title = title;
    product.assets = assets;
    product.description = description;
    product.feedback = feedback;
    product.category = category;
    const updateProduct = await product.save();
    return res.status(200).json({
        product :  updateProduct
    });
  } catch (err) {
    
  }
};
