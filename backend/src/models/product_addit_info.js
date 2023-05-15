const mongoose = require('mongoose');



const productInfo = mongoose.Schema({
  info:{type:Object,requried:true},
  block:{type:String,required:true},
})


module.exports = mongoose.model('product_info_addit' , productInfo);
