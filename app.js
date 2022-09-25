var express = require("express");
require("dotenv").config();
var app = express();
var dbConnect = require("./database/connection")
var userRouter = require('./routes/userRouter')

dbConnect();
app.use(userRouter)

app.get("/", (req, res, next) => {
    res.send("Server is runningg")
})

app.listen(process.env.PORT, () => {
    console.log("Starting Express Server");
})