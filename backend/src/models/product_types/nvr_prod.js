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
    vca_counting_solution:{type:String,required:true},
    vca_event_search:{type:String,required:true},
    smart_search_ii:{type:String,required:true},
    trend_micro_iot_security:{type:String,required:true},
    cybersecurity_managment:{type:String,required:true}
  },
  audio:{
    audio_format:{type:String,required:true},
    audio_in:{type:String,required:true},
    audio_out:{type:String,required:true}
  },
  deep_search:{
    object_search:{type:String,required:true},
    scence_search:{type:String,required:true},
    attribute_search:{type:String,required:true}
  },
  remote:{
    mobile_tablet_app:{type:String,required:true},
    web_browser:{type:String,required:true},

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
    network_throughput_input_output_total:{type:String,required:true},
    poe:{type:String,required:true},
    poe_managment:{type:String,required:true},
    protocols:{type:String,required:true}
  },
  playback:{
    playback_display_channels:{type:String,required:true},
    display_spec:{type:String,required:true},
    playback_control:{type:String,required:true},
    video_search:{type:String,required:true},
    thumbnail_explorer:{type:String,required:true},
    snapshot:{type:String,required:true},
    video_clip_export:{type:String,required:true}
  },
  recording:{
    recording_time:{type:String,required:true},
    post:{type:String,required:true},
    recording_stream:{type:String,required:true},
    recording_throughput:{type:String,required:true},
    recording_mode:{type:String,required:true},
    recording_setting:{type:String,required:true},
    watermark:{type:String,required:true}
  },
  storage:{
    hdd_devices:{type:String,required:true},
    raid:{type:String,required:true},
    disk_management:{type:String,required:true},
    hdd_tech:{type:String,required:true},
    external_storage:{type:String,required:true},
    video_clip_export:{type:String,required:true},
    schedule_backup:{type:String,required:true}
  },
  system:{
    camera_integration: {type:String,required:true},
    event: {type:String,required:true},
    event_action: {type:String,required:true},
    user_management: {type:String,required:true},
    log: {type:String,required:true},
    date: {type:String,required:true},
    language: {type:String,required:true}
  },
  video:{
    format:{type:String,required:true},
    decoder:{type:String,required:true},
    resolution:{type:String,required:true},
    capability:{type:String,required:true},
    needs_keys:{type:String,required:true},
    needs_keys_1:{type:String,required:true}
  }
})

module.exports = mongoose.model('nvr_prod' , nvr);

/*
prodict code
prodict name
image
technical_images


*/
