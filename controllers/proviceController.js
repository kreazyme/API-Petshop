const Provice = require('../database/models/proviceModel');
exports.AddProvice = async (req,res)=>{
    try{
        const provice = new Provice(req.body);
        const save = await provice.save();
        res.status(200).json(save);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getProvice = async (req,res)=>{
    try{
        const provice = await Provice.findById(req.params.id);
        res.status(200).json(provice);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.updateProvice = async (req, res) => {
    try{
        const provice = await Provice.findById(req.params.id);
        await provice.updateOne({$set: req.body});
        res.status(200).json("provice updated");
    }catch(err){
        res.status(500).json(err);
    }
};
exports.deleteProvice = async (req, res) => {
    try{
        await Provice.findByIdAndDelete(req.params.id);
        res.status(200).json("provice deleted")
    }catch(err){
        res.status(500).json(err);
    }
};