const mongoose = require('mongoose');

const productInfo = mongoose.Schema({
    product_code:{type:String,required:false},
    product_name:{type:String,required:false},
    image:{type:String,required:false},
    technicalImages:{type:Array,required:false},
    description:{type:String,required:false},
    category:{type:String,required:false},
    addit_category:{type:String,required:false},
    features:{type:Array,required:false},
    feature_deprec:{type:String,required:false},
    manufacturer:{type:String,required:false},
    tech_drawing:{type:String,required:false},
    cost:{
      amount:{type:String,required:false},
      currency:{type:String,required:false}
    },
    productType:{
      modelName:{type:String,required:false},
      id:{type:mongoose.Schema.Types.ObjectId}
    }
})

module.exports = mongoose.model('product_info' , productInfo);
