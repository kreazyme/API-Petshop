const Assets = require('../database/models/assetsModel');
const Product = require('../database/models/productModel');

exports.addAAssets =  async (req, res)=>{
    try{
        const newAssets = new Assets(req.body);
        const saveAssets = await newAssets.save();

        res.status(200).send(saveAssets);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getAllAssets  = async (req, res)=>{
    try{
        const allAssets = await Assets.find();
        res.status(200).json(allAssets);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getAAssets = async (req, res) => {
    try{
        const assets = await Assets.findById(req.params.id);
        res.status(200).json(assets);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.updateAssets= async (req,res) => {
    try{
        const assets = await Assets.findById(req.params.id);
        await assets.updateOne({$set:req.body});
        res.status(200).json('Assets updated');
    }catch(err){
        res.status(500).json(err);
    }
    
};
exports.deleteAssets= async (req, res)=>{
    try{
        // await Product.updateMany({category:req.params.id},{category:null});
        await Assets.findByIdAndDelete(req.params.id);
        res.status(200).json('Assets deleted');
    }catch(err){
        res.status(500).json(err);
    }
};