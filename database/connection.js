const mongoose = require("mongoose");
module.exports = async () => {
    try {
        await mongoose.connect("mongodb+srv://kreazy:1234@kreazydb.weyhj1s.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
        console.log("Database connected!! ");
    }
    catch (error) {
        console.log("Error in database/connection.js: " + error);
        throw new Error(error)
    }
}