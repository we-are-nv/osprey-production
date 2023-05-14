const mongoose = require('mongoose');

const ethernet = mongoose.Schema({
  eth_interface:{
  connector:{type:String,required:true},
  cable:{type:String,required:true},
  rate:{type:String,required:true}
  },
  interface:{

  },
  led:{
    LED_indicator_lights: {type:String,required:true},
    ethernet_status_lights: {type:String,required:true},
    POE: {type:String,required:true},
    POE_lights: {type:String,required:true}
  },
  onboard:{
    gain:{type:String,required:true},
    processor:{type:String,required:true},
    memory:{type:String,required:true}
  },
  physical:{
    dimensions: {type:String,required:true},
    weight: {type:String,required:true},
    operating_temperature: {type:String,required:true},
    relative_humidity: {type:String,required:true},
    compliance: {type:String,required:true},
    mounting_options: {type:String,required:true}
  },
  power:{
    power:  {type:String,required:true},
    unit_power:  {type:String,required:true},
    "poe_in_(base)":  {type:String,required:true},
    "poe_out_(camera)":  {type:String,required:true},
    "dc_power_in_(base)":  {type:String,required:true},
    power_method:  {type:String,required:true},
    esd_emp_protection: {type:String,required:true}
  }
})



module.exports = mongoose.model('ethernet_prod' , ethernet);

/*
prodict code
prodict name
image
technical_images


*/
