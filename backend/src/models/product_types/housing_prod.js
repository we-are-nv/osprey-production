const mongoose = require('mongoose');

const housingProd = mongoose.Schema({
  addit_info:{
    movement:{type:String,required:true},
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
  },
  movements:{
    pan_range: {type:String,required:true},
    dimensions_external_mm: {type:String,required:true},
    pan_speed: {type:String,required:true},
    tilt_range: {type:String,required:true},
    tilt_speed: {type:String,required:true},
    pre_sets: {type:String,required:true},
    pre_set_tours: {type:String,required:true},
    motion_tracking: {type:String,required:true}
  },
  physical:{
    dimensions: {type:String,required:true},
    weight: {type:String,required:true},
    operating_temperature: {type:String,required:true},
    relative_humidity: {type:String,required:true},
    compliance: {type:String,required:true},
    dimensions_external: {type:String,required:true},
    dimensions_internal: {type:String,required:true},
    mounting_options: {type:String,required:true}
  },
  optics:{
    ir_illumination_range:{type:String,required:true},
    window:{type:String,required:true}
  }
})

module.exports = mongoose.model('housing_prod' , housingProd);

/*
prodict code
prodict name
image
technical_images


*/
