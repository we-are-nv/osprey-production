const mongoose = require('mongoose');



const categoryInfo = mongoose.Schema({
  name:{type:String,requried:true},
  image:{type:String,required:true},
})


module.exports = mongoose.model('category' , categoryInfo);
