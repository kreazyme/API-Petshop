const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
//     product:[
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'Product',
//         required: true,
//     },
// ],
    title:{
        type: String,
        required:true,
    },
});

module.exports = mongoose.model('Category',categorySchema);