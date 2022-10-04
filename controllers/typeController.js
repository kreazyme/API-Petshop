const Type = require('../database/models/typeModel');
const Product = require('../database/models/productModel');

exports.addAType =  async (req, res)=>{
    try{
        const newType = new Type(req.body);
        const saveType = await newType.save();

        res.status(200).send(saveType);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getAllType  = async (req, res)=>{
    try{
        const allType = await Type.find();
        res.status(200).json(allType);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getAType = async (req, res) => {
    try{
        const type = await Type.findById(req.params.id);
        res.status(200).json(type);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.updateType= async (req,res) => {
    try{
        const type = await Type.findById(req.params.id);
        await type.updateOne({$set:req.body});
        res.status(200).json('Type updated');
    }catch(err){
        res.status(500).json(err);
    }
    
};
exports.deleteType= async (req, res)=>{
    try{
        // await Product.updateMany({category:req.params.id},{category:null});
        await Type.findByIdAndDelete(req.params.id);
        res.status(200).json('Type deleted');
    }catch(err){
        res.status(500).json(err);
    }
};