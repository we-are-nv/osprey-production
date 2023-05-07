const mongoose = require('mongoose');

const accessoryProduct = mongoose.Schema({
  av:{
    camera:{type:String,required:false},
    resolution:{type:String,required:false},
    pixels:{type:String,required:false},
    frame_rate:{type:String,required:false},
    sensitivity:{type:String,required:false},
    optical_lens:{type:String,required:false},
    digital_zoom:{type:String,required:false},
    aperture_range:{type:String,required:false},
    angle_of_view:{type:String,required:false},
    "min-working_distance":{type:String,required:false},
    zoom_speed:{type:String,required:false},
    shooting_mode:{type:String,required:false},
    focusing_mode:{type:String,required:false},
    ir_illumination_range:{type:String,required:false},
    maxiumum_vehicle_speed:{type:String,required:false},
    digital_image_stabilisation:{type:String,required:false},
    dori:{type:String,required:false},
    "on-board_storage":{type:String,required:false},
    white_balance:{type:String,required:false},
    wide_dynamic_range:{type:String,required:false},
    signal_to_noise_ratio:{type:String,required:false},
    image_features:{type:String,required:false},
    privacy_â_masking:{type:String,required:false},
    analytics:{type:String,required:false},
    video_compression:{type:String,required:false},
    bitrate:{type:String,required:false},
    audio_connection:{type:String,required:false},
    audio_compression:{type:String,required:false}
  },
  power: {
    ethernet: {type:String,required:false},
    rs485: {type:String,required:false},
    bnc_output: {type:String,required:false},
    alarm_in_out: {type:String,required:false},
    audio_in_out_connector: {type:String,required:false},
    power_supply: {type:String,required:false},
    power_consumption: {type:String,required:false}
  },
  pan_tilt: {
    'pan-range': {type:String,required:false},
    'pan-speed': {type:String,required:false},
    'tilt-range': {type:String,required:false},
    'tilt-speed': {type:String,required:false},
    'pre-sets': {type:String,required:false},
    'pre-set_tours': {type:String,required:false},
    motion_tracking: {type:String,required:false}
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
  power_conn: {
    ethernet: {type:String,required:false},
    rs485:{type:String,required:false},
    bnc_output: {type:String,required:false},
    alarm_in_out: {type:String,required:false},
    audio_in_out_connector: {type:String,required:false},
    power_supply: {type:String,required:false},
    power_consumption: {type:String,required:false}
  },
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
})

module.exports = mongoose.model('cam_prod' , accessoryProduct);

/*
prodict code
prodict name
image
technical_images


*/
