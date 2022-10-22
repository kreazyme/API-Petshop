const mongoose = require('mongoose');
const districtSchema = new mongoose.Schema({
    title:{
        type:String,
       // required:true,
    },
});

module.exports = mongoose.model('District',districtSchema);