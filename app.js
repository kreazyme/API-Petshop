var express = require("express");
require("dotenv").config();
var app = express();
var dbConnect = require("./database/connection")
const PORT = process.env.PORT && 3000;

// dbConnect();

app.get("/", (req, res, next) => {
    res.send("Server is runningg")
})
app.listen(PORT, () => {
    console.log("Starting Express Server");
})