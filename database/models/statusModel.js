const mongoose = require('mongoose');
const statusSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("Status", statusSchema);