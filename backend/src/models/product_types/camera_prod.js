const mongoose = require('mongoose');

const accessoryProduct = mongoose.Schema({
  av:{
    camera:{type:String,required:true},
    resolution:{type:String,required:true},
    pixels:{type:String,required:true},
    frame_rate:{type:String,required:true},
    sensitivity:{type:String,required:true},
    optical_lens:{type:String,required:true},
    digital_zoom:{type:String,required:true},
    aperture_range:{type:String,required:true},
    angle_of_view:{type:String,required:true},
    "min-working_distance":{type:String,required:true},
    zoom_speed:{type:String,required:true},
    shooting_mode:{type:String,required:true},
    focusing_mode:{type:String,required:true},
    ir_illumination_range:{type:String,required:true},
    maxiumum_vehicle_speed:{type:String,required:true},
    digital_image_stabilisation:{type:String,required:true},
    dori:{type:String,required:true},
    "on-board_storage":{type:String,required:true},
    white_balance:{type:String,required:true},
    wide_dynamic_range:{type:String,required:true},
    signal_to_noise_ratio:{type:String,required:true},
    image_features:{type:String,required:true},
    privacy_â_masking:{type:String,required:true},
    analytics:{type:String,required:true},
    video_compression:{type:String,required:true},
    bitrate:{type:String,required:true},
    audio_connection:{type:String,required:true},
    audio_compression:{type:String,required:true}
  },
  power: {
    ethernet: {type:String,required:true},
    rs485: {type:String,required:true},
    bnc_output: {type:String,required:true},
    alarm_in_out: {type:String,required:true},
    audio_in_out_connector: {type:String,required:true},
    power_supply: {type:String,required:true},
    power_consumption: {type:String,required:true}
  },
  pan_tilt: {
    'pan-range': {type:String,required:true},
    'pan-speed': {type:String,required:true},
    'tilt-range': {type:String,required:true},
    'tilt-speed': {type:String,required:true},
    'pre-sets': {type:String,required:true},
    'pre-set_tours': {type:String,required:true},
    motion_tracking: {type:String,required:true}
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
  physical:{
    material:{type:String,required:true},
    operating_temp:{type:String,required:true},
    thermostat_heater:{type:String,required:true},
    relative_humidity:{type:String,required:true},
    atmospheric_pressure:{type:String,required:true},
    weight:{type:String,required:true},
    dimensions:{type:String,required:true},
    cable_entry:{type:String,required:true},
    mounting_options:{type:String,required:true}
  },
})

module.exports = mongoose.model('cam_prod' , accessoryProduct);

/*
prodict code
prodict name
image
technical_images


*/
