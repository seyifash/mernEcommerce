const express = require('express');
const errorMiddleware = require('./middleWares/errors')


const app = express();

const cookieParser = require('cookie-parser')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(cookieParser());

const getProducts = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');


app.use('/api/v1', getProducts)
app.use('/api/v1', auth)
app.use('/api/v1', order)


app.use(errorMiddleware);

module.exports = app;