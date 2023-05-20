const mongoose = require('mongoose');
const product_info = require('./product_info');



const productInfo = mongoose.Schema({
  info:{type:Object,requried:true},
  productId:{type:mongoose.Schema.Types.ObjectId,ref:product_info},
  modelName:{type:String,required:true},
})


module.exports = mongoose.model('product_info_addit' , productInfo);
