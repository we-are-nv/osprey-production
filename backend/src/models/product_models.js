const mongoose = require('mongoose');



const productInfo = mongoose.Schema({
  data:{type:Object,requried:true},
  type_name:{type:String,required:true},
})


module.exports = mongoose.model('product_models' , productInfo);
