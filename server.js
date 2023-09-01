const express = require('express');
const app = express();
const fetch = require('node-fetch');
var logger = require('morgan');
var cors = require('cors');
var bodyParser= require('body-parser');
require("dotenv").config()

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

const ordersRouter = require('./routes/orders');
app.use('/orders',ordersRouter);

const sAsOrdersRouter = require('./routes/sAsOrders');
app.use('/sorders',sAsOrdersRouter);

app.get('/', async (req, res)=>{
    
    res.send("welcome...")
   
})

const port = process.env.PORT || 9000;
var server = app.listen(port, function(){
    console.log(`Listening on port ${port}...`);
});

module.exports = app;