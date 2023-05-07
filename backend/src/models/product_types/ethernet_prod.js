const mongoose = require('mongoose');

const ethernet = mongoose.Schema({
  eth_interface:{
  connector:{type:String,required:false},
  cable:{type:String,required:false},
  rate:{type:String,required:false}
  },
  interface:{

  },
  led:{
    LED_indicator_lights: {type:String,required:false},
    ethernet_status_lights: {type:String,required:false},
    POE: {type:String,required:false},
    POE_lights: {type:String,required:false}
  },
  onboard:{
    gain:{type:String,required:false},
    processor:{type:String,required:false},
    memory:{type:String,required:false}
  },
  physical:{
    dimensions: {type:String,required:false},
    weight: {type:String,required:false},
    operating_temperature: {type:String,required:false},
    relative_humidity: {type:String,required:false},
    compliance: {type:String,required:false},
    mounting_options: {type:String,required:false}
  },
  power:{
    power:  {type:String,required:false},
    unit_power:  {type:String,required:false},
    "poe_in_(base)":  {type:String,required:false},
    "poe_out_(camera)":  {type:String,required:false},
    "dc_power_in_(base)":  {type:String,required:false},
    power_method:  {type:String,required:false},
    esd_emp_protection: {type:String,required:false}
  }
})



module.exports = mongoose.model('ethernet_prod' , ethernet);

/*
prodict code
prodict name
image
technical_images


*/
