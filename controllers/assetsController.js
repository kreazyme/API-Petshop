const Assets = require('../database/models/assetsModel');
exports.AddAssets = async (req, res)=>{
    try{
        const  assets = new Assets(req.body);
        const save = await assets.save();
        res.status(200).json(save);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getAsset = async (req, res) => {
    try{
        const asset = await Assets.findById(req.params.id);
        res.status(200).json(asset);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.updateAssets = async (req, res) => {
    try{
        const asset = await Asset.findById(req.params.id);
        await asset.updateOne({$set: req.body});
        res.status(200).json("Assets updated");
    }catch(err){
        res.status(500).json(err);
    }
};
exports.deleteAssets = async (req, res) => {
    try{
        await Assets.findByIdAndDelete(req.params.id);
        res.status(200).json('deleted')
    }catch(err){
        res.status(500).json(err);
    }
};