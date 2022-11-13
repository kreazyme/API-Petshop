const Address = require('../../models/address/addrModel');

const AddressCtrl = {
  createAddress: async (req, res) => {
    const {
      nameCustomer,
      province,
      district,
      town,
      phone,
      description,
    } = req.body;
  },
};

module.exports = AddressCtrl;
