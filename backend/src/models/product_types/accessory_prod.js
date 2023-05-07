const mongoose = require('mongoose');

const accessoryProduct = mongoose.Schema({
  physical:{
    material:{type:String,required:false},
    operating_temp:{type:String,required:false},
    thermostat_heater:{type:String,required:false},
    relative_humidity:{type:String,required:false},
    atmospheric_pressure:{type:String,required:false},
    weight:{type:String,required:false},
    dimensions:{type:String,required:false},
    cable_entry:{type:String,required:false},
    mounting_options:{type:String,required:false}
  },
  power:{
    power_supply:{type:String,required:false},
    power_consumption:{type:String,required:false},
  },
  certifications:{
    impact_protection: {type:String,required:false},
    salt_fog_resistance: {type:String,required:false},
    corrosion_testing: {type:String,required:false},
    vibration_testing: {type:String,required:false},
    ingress_protection: {type:String,required:false},
    european_US_EMC: {type:String,required:false},
    marine: {type:String,required:false},
    hazardous_area: {type:String,required:false}
  }
})

module.exports = mongoose.model('acc_prod' , accessoryProduct);

/*
prodict code
prodict name
image
technical_images


*/
