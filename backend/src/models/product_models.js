const mongoose = require('mongoose');
const categorys = require('./categorys');



const productModels = mongoose.Schema({
  data:{type:Object,requried:true},
  category:{type:mongoose.Schema.Types.ObjectId,ref:categorys},
  type_name:{type:String,required:true},
})


module.exports = mongoose.model('product_models' , productModels);
