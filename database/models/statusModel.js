const mongoose = require('mongoose');
const statusSchema = new mongoose.Schema({
    statusId: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
});

module.exports = mongoose.model("Status", statusSchema);