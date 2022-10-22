const District = require('../database/models/districtModel');
exports.AddDistrict = async (req,res)=>{
    try{
        const district = new District(req.body);
        const save = await district.save();
        res.status(200).json(save);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.getDistrict = async (req,res)=>{
    try{
        const district = await District.findById(req.params.id);
        res.status(200).json(district);
    }catch(err){
        res.status(500).json(err);
    }
};
exports.updateDistrict = async (req, res) => {
    try{
        const district = await District.findById(req.params.id);
        await district.updateOne({$set: req.body});
        res.status(200).json("District updated");
    }catch(err){
        res.status(500).json(err);
    }
};
exports.deleteDistrict= async (req, res) => {
    try{
        await District.findByIdAndDelete(req.params.id);
        res.status(200).json("District deleted")
    }catch(err){
        res.status(500).json(err);
    }
};