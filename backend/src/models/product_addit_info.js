const mongoose = require('mongoose');
const product_info = require('./product_info');



const productAdditInfo = mongoose.Schema({
  info:{type:Object,requried:true},
  modelName:{type:String,required:true},
})


module.exports = mongoose.model('product_info_addit' , productAdditInfo);
