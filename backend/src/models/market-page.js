const mongoose = require('mongoose');



const marketPage = mongoose.Schema({
  name:{type:String,required:true},
  elements:[{
    type:{type:String,required:true},
    header:{type:String,required:false},
    text:{type:String,required:false},
    images:{type:Array,required:false}
  }]
});


module.exports = mongoose.model('market-pages' , marketPage);
