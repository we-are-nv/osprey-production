const mongoose = require('mongoose');
const categorys = require('./categorys');



const productInfo = mongoose.Schema({
  category:{type:mongoose.Schema.Types.ObjectId,ref:categorys},
  data:{type:String,required:true},
})


module.exports = mongoose.model('block_list' , productInfo);
