const Product = require('../database/models/productModel');
const Type = require('../database/models/typeModel');
const Assets = require('../database/models/assetsModel');
const Category = require('../database/models/categoryModel');


exports.AddProduct = async (req, res) => {
  
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    if (req.body.type || req.body.assets || req.body.category) {
      const type = Type.findById(req.body.type);
      const assets = Assets.findById(req.body.assets);
      const category = Category.findById(req.body.category);
      await type.updateOne({ $push: { newProduct: saveProduct._id } });
      await assets.updateOne({ $push: { newProduct: saveProduct._id } });
      await category.updateOne({ $push: { newProduct: saveProduct._id } });
    }
    res.status(200).json(saveProduct);
  
};
exports.getAllProduct = async (req, res) => {
  try {
    const allProduct = await Product.find();
    res.status(200).json(allProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('type')
      .populate('assets')
      .populate('category');
    //console.log(product.category)
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const {type,title,quantity,assets,description, feedback,category} = req.body;
  try {
    const product = await Product.findOne({_id:id});
    await product.updateOne({ $set: req.body });
    product.type = type;
    product.title = title;
    product.quantity = quantity;
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

exports.deleteProduct = async (req, res)=>{
  try{
    await Type.updateMany(
      {product: req.params.id},
      {$pull:{product:req.params.id}}
    );
    await Assets.updateMany(
      {product:req.params.id},
      {$pull:{product:req.params.id}}
    );
    await Category.updateMany(
      {product:req.params.id},
      {$pull:{product:req.params.id}}
    );
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted");
  }catch(err){
    res.status(500).json(err);
  }
};

