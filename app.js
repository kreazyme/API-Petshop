var express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser")

var app = express();
var dbConnect = require("./database/connection")
var userRouter = require('./routes/userRouter');
const verifyToken = require("./middlewares/verifyJWT");

dbConnect();
app.use("/auth", userRouter)
app.use(express.json())
app.use(verifyToken)
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", verifyToken, (req, res, next) => {
    // console.log(req);
    res.send("Server is runningg")
})

app.listen(process.env.PORT, () => {
    console.log("Starting Express Server");
})