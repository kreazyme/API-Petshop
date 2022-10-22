const Provice = require('../database/models/proviceModel');
const Town = require('../database/models/townModel');
const District = require('../database/models/districtModel');
const Address = require('../database/models/addressModel');


exports.AddAddress = async (req, res) => {
  
    const newAddress = new Address(req.body);
    const saveAddress = await newAddress.save();
    if (req.body.district || req.body.provice || req.body.town) {
      const district = District.findById(req.body.district);
      const provice = Provice.findById(req.body.provice);
      const town = Town.findById(req.body.town);
      await district.updateOne({ $push: { newAddress: saveAddress._id } });
      await provice.updateOne({ $push: { newAddress: saveAddress._id } });
      await town.updateOne({ $push: { newAddress: saveAddress._id } });
    }
    res.status(200).json(saveAddress);
  
};