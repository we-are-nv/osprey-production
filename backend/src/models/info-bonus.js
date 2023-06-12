const mongoose = require('mongoose');
const marketPage = require('./information-page');



const infoBonusInfo = mongoose.Schema({


    title:{type:String,required:true},
    type:{type:String,required:true},
    color:{type:String,required:true},
    files:{type:Array,required:false},
    elements:{type:Array,required:false},


})


module.exports = mongoose.model('info-Bonus' , infoBonusInfo);
