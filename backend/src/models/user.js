const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
  full_name:{type:String,required:true},
  email:{type:String,required:true,unique:true,match: /.+\@.+\..+/ },
  password:{type:String,required:true},
  date_created:{type:Number,required:true},
})

module.exports = mongoose.model('user', userSchema);
