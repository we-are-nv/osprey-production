const products = require('../src/models/product_info');
const adiit = require('../src/models/product_addit_info')
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;

const path = require('path');
const fs = require('fs')
require('dotenv').config({path:path.join(__dirname,"../",'.env')});

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(err => {
    console.log('Connection Failed' + err);
  });


adiit.find({})
.then((result) => {
  for (idx in result){
    products.findOneAndUpdate(
      { _id: new ObjectId(result[idx].productId) },
      { $set: { 'additional_information': result[idx]._id}},{upsert:true}).then((result, err) => {
        console.log({ data: result, message:"Value Updated" });
     })
  }

})
