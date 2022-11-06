const Town = require('../models/address/town');
const Address = require('../models/address/addrModel');

const TownCtrl = {
    getTown:async(req, res)=>{
        const town = await Town.find()
        res.json(town)
    },
    createTown:async(req, res)=>{
        const {name} = req.body;
        const town = await Town.findOne({name})
        if(town){
            res.status(400).json({msg:"Has been Town thu lai di dit me"});
        }
        const newTown = new Town({name});
        await newTown.save();
        res.json({msg:"Success cc"})
    },
    deleteTown:async(req, res) =>{}
}
// add 
// add
module.exports = TownCtrl;