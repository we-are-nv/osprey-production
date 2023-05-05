const mongoose = require('mongoose');

const nvr = mongoose.Schema({
  addit_info:{
    input:{type:String,required:true},
    consumption:{type:String,required:true},
    dimensions:{type:String,required:true},
    weight:{type:String,required:true},
    temp:{type:String,required:true},
    humidity:{type:String,required:true},
    safety:{type:String,required:true},
    mobile_app:{type:String,required:true},
    web_browser:{type:String,required:true}
  },
  adv_features:{
    vca_count:{type:String,required:true},
    vca_event:{type:String,required:true},
    smart_search:{type:String,required:true},
    trend_micro:{type:String,required:true},
    cyber_managment:{type:String,required:true}
  },
  audio:{
    format:{type:String,required:true},
    in:{type:String,required:true},
    out:{type:String,required:true}
  },
  deep_search:{
    obj_search:{type:String,required:true},
    scence_search:{type:String,required:true},
    attri_seach:{type:String,required:true}
  },
  device:{
    os:{type:String,required:true},
    watchdog:{type:String,required:true},
    power_restoration:{type:String,required:true}
  },
  display:{
    live_view_channels:{type:String,required:true},
    live_view_specs:{type:String,required:true},
    output:{type:String,required:true},
    resolution:{type:String,required:true},
    dewarp:{type:String,required:true},
    warp:{type:String,required:true},
    ptz_oper:{type:String,required:true}
  },
  interface:{
    usb_front:{type:String,required:true},
    usb_rear:{type:String,required:true},
    alarm_in:{type:String,required:true},
    alarm_out:{type:String,required:true},
    audio_in:{type:String,required:true},
    rs485:{type:String,required:true}
  },
  network:{
    ethernet:{type:String,required:true},
    net_input_out_total:{type:String,required:true},
    PoE:{type:String,required:true},
    PoE_managment:{type:String,required:true},
    protocols:{type:String,required:true}
  },
  playback:{
    display_channels:{type:String,required:true},
    dis_spec:{type:String,required:true},
    playback_control:{type:String,required:true},
    video_search:{type:String,required:true},
    thumbnail:{type:String,required:true},
    snapshot:{type:String,required:true},
    export:{type:String,required:true}
  },
  recording:{
    time_sec:{type:String,required:true},
    post:{type:String,required:true},
    stream:{type:String,required:true},
    throughput:{type:String,required:true},
    mode:{type:String,required:true},
    setting:{type:String,required:true},
    watermark:{type:String,required:true}
  },
  storage:{
    hdd:{type:String,required:true},
    raid:{type:String,required:true},
    disk_manage:{type:String,required:true},
    hdd_tech:{type:String,required:true},
    external_storage:{type:String,required:true},
    clip_export:{type:String,required:true},
  },
  system:{
    camera_integration: {type:String,required:true},
    event: {type:String,required:true},
    event_action: {type:String,required:true},
    user_management: {type:String,required:true},
    log: {type:String,required:true},
    date_time: {type:String,required:true},
    language: {type:String,required:true}
  },
  video:{
    format:{type:String,required:true},
    decoder:{type:String,required:true},
    resolution:{type:String,required:true},
    capability:{type:String,required:true},
    needsKeys:{type:Array,required:true}
  }
})

module.exports = mongoose.model('nvr_prod' , nvr);

/*
prodict code
prodict name
image
technical_images


*/
