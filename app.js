const express = require('express');
const app = express();
const morgan =  require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/product');

mongoose.connect("mongodb+srv://admin-rishi:m0ng00se@cluster0-rtpri.mongodb.net/tsec",{
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Headers','*');//Origin, X-Requested-With, Content-Type, Accept, Authorization
  if(req.method==='OPTIONS'){
    res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
})

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.use((req,res,next)=>{
  const error = new Error("Not Found...");
  error.status = 404;
  next(error);
})

app.use((error,req,res,next)=>{
  res.status(error.status||500);
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app; 
