const mongoose = require('mongoose');

const productInfo = mongoose.Schema({
    product_code:{type:String,required:true},
    product_name:{type:String,required:true},
    image:{type:String,required:true},
    technicalImages:{type:Array,required:true},
    description:{type:String,required:true},
    features:{type:Array,required:true},
    feature_deprec:{type:String,required:true},
    tech_drawing:{type:String,required:false},
    cost:{
      amount:{type:Number,required:true},
      currency:{type:String,required:true}
    },
    productType:{
      modelName:{type:String,required:true},
      id:{type:mongoose.Schema.Types.ObjectId}
    }
})

module.exports = mongoose.model('product_info' , productInfo);
