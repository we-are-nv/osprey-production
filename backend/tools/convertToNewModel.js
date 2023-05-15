const selectedModel = require('../src/models/product_types/nvr_prod');
const mongoose = require('mongoose');
const path = require('path');
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

var newObj = {data:{},type_name:'nvr'};

selectedModel.find().then((result)=>{

    for (idx in result){
      //console.log(result[idx])
      if (idx == 0 ){
        var keys = Object.keys(result[idx]._doc);
        for (keyIdx in keys){
          if (keys[keyIdx] != "_id" && keys[keyIdx] != "__v"){
            //console.log(keys[keyIdx])
            var selectedObj = result[idx][keys[keyIdx]]
            newObj.data[keys[keyIdx]] = Object.keys(selectedObj)

          }
        }
        console.log(newObj)

      }


  }
  //console.log(result)
})
