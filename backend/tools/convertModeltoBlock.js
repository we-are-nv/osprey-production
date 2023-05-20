const selectedModel = require('../src/models/product_types/camera_prod');
const madeProducts = require('../src/models/product_info')
const mongoose = require('mongoose');

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

  var masterFile = []
  selectedModel.find()
  .then((result) => {
    for (idx in result){
    madeProducts.findOne({"productType.id":result[idx]._doc._id})
    .then((newResult) => {
      var exitingString = newResult._id.toString();
      var newObj  = {
        info:{},
        modelName:'camera',
        productId:`ObjectId(${exitingString})`
      }
      for (const [key, value] of Object.entries(result[idx]._doc)) {
        if (key != "_id" && key != "__v"){
          newObj.info[key] = value;
        }

      }
      masterFile.push(newObj);
      //console.log(masterFile)
      fs.writeFileSync('./output.json',JSON.stringify(masterFile))
    })


    }



  })


