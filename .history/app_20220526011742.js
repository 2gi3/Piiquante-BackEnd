require("dotenv").config({path: __dirname + '/.env'});
// import * as ENV from '.env'
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
// mongoose.connect('mongodb+srv://ocproject6:pr6oc@project6.lvb15.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

const mongoDB =
  "mongodb+srv://nooutidev:nooutidev@cluster0.4klrn.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDB) .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => { 
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

  app.use(express.json());
  app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use('/api/sauces', sauceRoutes) 
app.use('/api/auth', userRoutes);

module.exports = app;