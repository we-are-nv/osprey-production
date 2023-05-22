const mongoose = require('mongoose');



const categoryInfo = mongoose.Schema({
  name:{type:String,requried:true,unique:true},
  image:{type:String,required:true},
})


module.exports = mongoose.model('category' , categoryInfo);
