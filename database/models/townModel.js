const mongoose = require('mongoose');
const townSchema = new mongoose.Schema({
    title:{
        type:String,
        //required:true,
    },
});
module.exports = mongoose.model("Town", townSchema);