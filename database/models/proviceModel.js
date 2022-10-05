const mongoose = require('mongoose');
const provinceSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model('Province',provinceSchema);