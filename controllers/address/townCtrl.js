const Town = require('../../models/address/town');
const Address = require('../../models/address/addrModel');

const TownCtrl = {
    getTown:async(req, res)=>{
        const town = await Town.find()
        res.json(town)
    },
    createTown:async(req, res)=>{
        const {name} = req.body;
        const town = await Town.findOne({name})
        if(town){
           return res.status(400).json({msg:"Has been Town"});
        }
        const newTown = new Town({name});
        await newTown.save();
        res.json({msg:"Success cc"})
    },
    deleteTown:async(req, res) =>{
        try{
            const address = Address.findOne({town:req.params.id})
            // dang suy nghi
        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateTown:async(req, res) =>{
        const {name} = req.body;
        await Town.findOneAndUpdate({_id: req.params.id},{name});
        res.json({msg:"Update Success"})
    }
}
// add 
// add
module.exports = TownCtrl;