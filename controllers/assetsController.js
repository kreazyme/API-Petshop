const multer = require('multer');
const Assets = require('../database/models/assetsModel');
const Product = require('../database/models/productModel');
const Path = require('path');

const Storage = multer.diskStorage({
    destination:'public/images',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload =multer({
    storage:Storage
}).single('testImage');

exports.addAAssets =  async (req, res)=>{
    try{
        upload(req,res,(err)=>{
            const newAssets = new Assets({
                image:{
                    data:req.body.file,
                    contentType:'image/png'
                },
                type : req.body.type
             });
           //  newAssets.save().then(() =>res.send('Successfully uploaded'));
            // const saveAssets = await newAssets.save();
        })
        
        res.status(200).send('successfully');
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