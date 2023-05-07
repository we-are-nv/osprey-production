const mongoose = require('mongoose');

const housingProd = mongoose.Schema({
  addit_info:{
    movement:{type:String,required:false},
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
  },
  movements:{
    pan_range: {type:String,required:false},
    dimensions_external_mm: {type:String,required:false},
    pan_speed: {type:String,required:false},
    tilt_range: {type:String,required:false},
    tilt_speed: {type:String,required:false},
    pre_sets: {type:String,required:false},
    pre_set_tours: {type:String,required:false},
    motion_tracking: {type:String,required:false}
  },
  physical:{
    dimensions: {type:String,required:false},
    weight: {type:String,required:false},
    operating_temperature: {type:String,required:false},
    relative_humidity: {type:String,required:false},
    compliance: {type:String,required:false},
    dimensions_external: {type:String,required:false},
    dimensions_internal: {type:String,required:false},
    mounting_options: {type:String,required:false}
  },
  optics:{
    ir_illumination_range:{type:String,required:false},
    window:{type:String,required:false}
  }
})

module.exports = mongoose.model('housing_prod' , housingProd);

/*
prodict code
prodict name
image
technical_images


*/
