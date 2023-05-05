const mongoose = require('mongoose');

const diskNRVProd = mongoose.Schema({
  addit_info:{
    manufactuer:{type:String,required:true},
    size_tb:{type:Number,required:true}
  }
})

module.exports = mongoose.model('disk_nvr_prod' , diskNRVProd);

/*
prodict code
prodict name
image
technical_images


*/
