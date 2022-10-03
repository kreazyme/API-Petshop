var express = require("express");
require("dotenv").config();
var bodyParser = require("body-parser")

var app = express();
var dbConnect = require("./database/connection");
var userRouter = require('./routes/userRouter');
var orderRoute = require("./routes/orderRouter");
var SttRoute = require('./routes/statusRouter');
var productRoute = require('./routes/productRouter');
var orderItemRoute = require('./routes/orderItem');


const verifyToken = require("./middlewares/verifyJWT");

dbConnect();
app.use("/auth", userRouter);
app.use('/order', orderRoute);
app.use('/status', SttRoute);
app.use('/orderItem', orderItemRoute);
app.use('/product', productRoute);
app.use(express.json())
app.use(verifyToken)
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res, next) => {
    console.log(res);
    res.send("Server is runningg")
})

app.listen(process.env.PORT, () => {
    console.log("Starting Express Server");
})