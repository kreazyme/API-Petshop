const mongoose = require('mongoose');
const statusSchema = new mongoose.Schema({
    order:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Order',
    },
],
    title:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("Status", statusSchema);