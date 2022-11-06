const District = require('../../models/address/district');
const Address = require('../../models/address/addrModel');

const DistrictCtrl ={
    getDistrict:async(req, res)=>{
        const district = await District.find()
        res.json(district)
    },
    createDistrict:async(req, res)=>{
        const {name} = req.body;
        const district = await District.findOne({name})
        if(district){
           return res.status(400).json({msg:"Has been district"});
        }
        const newDistrict = new District({name});
        await newDistrict.save();
        res.json({msg:"Success cc"})
    }
}

module.exports = DistrictCtrl;