var express = require('express');
require('dotenv').config();
var bodyParser = require('body-parser');

var app = express();
var dbConnect = require('./database/connection');
var userRouter = require('./routes/userRouter');
var orderRoute = require('./routes/orderRouter');
var SttRoute = require('./routes/statusRouter');
const productRoute = require('./routes/productRouter');
const orderItemRoute = require('./routes/orderItem');
const categoryRoute = require('./routes/categoryRouter');
const typeRoute = require('./routes/typeRouter');
const asset = require('./routes/assetsRouter');
const verifyToken = require('./middlewares/authJWT');

dbConnect();
app.use('/auth', userRouter);
app.use('/order', orderRoute);
app.use('/status', SttRoute);
app.use('/orderItem', orderItemRoute);
app.use('/product', productRoute);
app.use('/category', categoryRoute);
app.use('/type', typeRoute);
app.use('/assets', asset);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  console.log(res);
  res.send('Server is runningg');
});

app.listen(process.env.PORT, () => {
  console.log('Starting Express Server');
});
