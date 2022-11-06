const Province = require('../../models/address/province');
const Address = require('../../models/address/addrModel');

const ProvinceCtrl ={
    getProvince:async(req, res)=>{
        const province = await Province.find()
        res.json(province)
    },
    createProvince:async(req, res)=>{
        const {name} = req.body;
        const province = await Province.findOne({name})
        if(province){
           return res.status(400).json({msg:"Has been district"});
        }
        const newProvince = new Province({name});
        await newProvince.save();
        res.json({msg:"Success"})
    }
}

module.exports = ProvinceCtrl;