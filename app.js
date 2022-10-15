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
var typeRoute = require('./routes/typeRouter');
var asset  = require('./routes/assetsRouter');
const verifyToken = require("./middlewares/verifyJWT");
app.use(morgan('dev'));
dbConnect();
app.use('/auth', userRouter);
app.use('/order',  orderRoute);
app.use('/status', SttRoute);
app.use('/orderItem',  orderItemRoute);
app.use('/product',  productRoute);
app.use('/category', categoryRoute);
app.use('/type', typeRoute);
app.use('/assets', asset);
app.use(express.json());
app.use(verifyToken)
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  console.log(res);
  res.send('Server is runningg');
});

app.listen(process.env.PORT, () => {
  console.log('Starting Express Server');
});
