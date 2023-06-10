const mongoose = require('mongoose');
const marketPage = require('./market-page');



const marketInfo = mongoose.Schema({
  name:{type:String,required:true},
  secondry_title:{type:String,required:true},
  lower_title:{type:String,required:true},
  banner_image:{type:String,required:false},
  thumbnail_image:{type:String,required:false},
  bonus_cards: {type:Array,required:true},
  pages:[
    {
      id:{type:mongoose.Schema.Types.ObjectId,ref:marketPage},
      name:{type:String,required:true}
    }
  ]

})


module.exports = mongoose.model('market' , marketInfo);
