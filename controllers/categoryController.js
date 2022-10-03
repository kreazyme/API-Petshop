const Category = require('../database/models/categoryModel');
const Product = require('../database/models/productModel');

exports.addACategory =  async (req, res)=>{
    try{
        const newCategory = new Category(req.body);
        const saveCategory = await newCategory.save();
        if(req.body.product){
            const product = Product.findById(req.body.product);
            await product.updateOne({ $push: {category:saveCategory._id }});
        }
        res.status(200).send(saveCategory);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getAllCategory = async (req, res)=>{
    try{
        const allCategory = await Category.find();
        res.status(200).json(allCategory);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getACategory = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id).populate('product');
        res.status(200).json(category);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.updateCategory = async (req,res) => {
    try{
        const category = await Category.findById(req.params.id);
        await category.updateOne({$set:req.body});
        res.status(200).json('Category updated');
    }catch(err){
        res.status(500).json(err);
    }
    
};
exports.deleteCategory = async (req, res)=>{
    try{
        await Product.updateMany({category:req.params.id},{category:null});
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json('Category deleted');
    }catch(err){
        res.status(500).json(err);
    }
};