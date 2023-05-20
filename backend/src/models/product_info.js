const mongoose = require('mongoose');
const categorys = require('./categorys');



const productInfo = mongoose.Schema({
    product_code:{type:String,required:true},
    product_name:{type:String,required:true},
    image:{type:String,required:true},
    technicalImages:{type:Array,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    addit_category:{type:String,required:true},
    features:{type:Array,required:true},
    product_link:{type:String,required:true},
    feature_deprec:{type:String,required:true},
    manufacturer:{type:String,required:true},
    tech_drawing:{type:String,required:true},
    category:{type:mongoose.Schema.Types.ObjectId,ref:categorys},
    cost:{
      amount:{type:String,required:true},
      currency:{type:String,required:true}
    },
    productType:{
      modelName:{type:String,required:true},
      id:{type:mongoose.Schema.Types.ObjectId}
    }
})


module.exports = mongoose.model('product_info' , productInfo);
