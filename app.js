var express = require('express');
const morgan = require('morgan');
require('dotenv').config();
var bodyParser = require('body-parser');

var app = express();
var dbConnect = require('./database/connection');
var userRouter = require('./routes/userRouter');
var orderRoute = require('./routes/orderRouter');
var SttRoute  = require('./routes/statusRouter');
var productRoute  = require('./routes/productRouter');
var orderItemRoute = require('./routes/orderItem');
const categoryRoute = require('./routes/categoryRouter');
const assetsRouter = require("./routes/assetsRouter");
const typeRouter = require("./routes/typeRouter");
const feedbackRouter = require("./routes/feedbackRouter");
const feedbackReplyRouter = require("./routes/feedbackReplyRouter");
const addressRouter = require("./routes/addressRouter");
const townRouter = require("./routes/townRouter");
const proviceRouter = require("./routes/proviceRouter");
const districtRouter = require("./routes/districtRouter");
//const verifyToken = require("./middlewares/authJWT");


const verifyToken = require("./middlewares/verifyJWT");
app.use(morgan('dev'));
dbConnect();
app.use('/auth', userRouter);
app.use('/order',  orderRoute);
app.use('/status', SttRoute);
app.use('/orderItem',  orderItemRoute);
app.use('/product',  productRoute);
app.use('/category', categoryRoute);
app.use('/assets',assetsRouter);
app.use('/type',typeRouter);
app.use('/feedback',feedbackRouter);
app.use('/feedbackReply',feedbackReplyRouter);
app.use('/address',addressRouter);
app.use('/provice',proviceRouter);
app.use('/town',townRouter);
app.use('/district',districtRouter);

app.use(express.json())
app.use(verifyToken)
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  console.log(res);
  res.send('Server is runningg');
});

app.listen(process.env.PORT, () => {
  console.log('Starting Express Server');
});
