const Town = require('../database/models/townModel');
exports.AddTown = async (req,res)=>{
    try{
        const town = new Town(req.body);
        const save = await town.save();
        res.status(200).json(save);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getTown = async (req,res)=>{
    try{
        const town = await Town.findById(req.params.id);
        res.status(200).json(town);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.updateTown = async (req, res) => {
    try{
        const town = await Town.findById(req.params.id);
        await town.updateOne({$set: req.body});
        res.status(200).json("town updated");
    }catch(err){
        res.status(500).json(err);
    }
};
exports.deleteTown = async (req, res) => {
    try{
        await Town.findByIdAndDelete(req.params.id);
        res.status(200).json("town deleted")
    }catch(err){
        res.status(500).json(err);
    }
};