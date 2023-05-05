const mongoose = require('mongoose');

const accessoryProduct = mongoose.Schema({
  physical:{
    material:{type:String,required:true},
    operating_temp:{type:String,required:true},
    therm_heater:{type:String,required:true},
    humidity:{type:String,required:true},
    pressure:{type:String,required:true},
    weight:{type:String,required:true},
    dimension:{type:String,required:true},
    cable_entry:{type:String,required:true},
    mounting_options:{type:String,required:true}
  },
  power:{
    power_supply:{type:String,required:true},
    power_consumption:{type:String,required:true},
  },
  certifications:{
    impact_protection: {type:String,required:true},
    salt_fog_resistance: {type:String,required:true},
    corrosion_testing: {type:String,required:true},
    vibration_testing: {type:String,required:true},
    ingress_protection: {type:String,required:true},
    european_US_EMC: {type:String,required:true},
    marine: {type:String,required:true},
    hazardous_area: {type:String,required:true}
  }
})

module.exports = mongoose.model('acc_prod' , accessoryProduct);

/*
prodict code
prodict name
image
technical_images


*/
