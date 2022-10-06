const Type = require('../database/models/typeModel');
exports.AddType = async (req,res)=>{
    try{
        const type = new Type(req.body);
        const save = await type.save();
        res.status(200).json(save);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getType = async (req,res)=>{
    try{
        const type = await Type.findById(req.params.id);
        res.status(200).json(type);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.updateType = async (req, res) => {
    try{
        const type = await Type.findById(req.params.id);
        await type.updateOne({$set: req.body});
        res.status(200).json("type updated");
    }catch(err){
        res.status(500).json(err);
    }
};
exports.deleteType = async (req, res) => {
    try{
        await Type.findByIdAndDelete(req.params.id);
        res.status(200).json("type deleted")
    }catch(err){
        res.status(500).json(err);
    }
};