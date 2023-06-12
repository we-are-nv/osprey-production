const mongoose = require('mongoose');
const marketPage = require('./information-page');
const infoBonus = require('./info-bonus');
const informationPage = require('./information-page');



const marketInfo = mongoose.Schema({
  name:{type:String,required:true},
  secondry_title:{type:String,required:true},
  lower_title:{type:String,required:true},
  banner_image:{type:String,required:false},
  thumbnail_image:{type:String,required:false},
  bonus_cards: [{
    id:{type:mongoose.Schema.Types.ObjectId,ref:infoBonus},
    name:{type:String,required:true}
  }],
  pages:[
    {
      id:{type:mongoose.Schema.Types.ObjectId,ref:informationPage},
      name:{type:String,required:true}
    }
  ]

})


module.exports = mongoose.model('info' , marketInfo);
