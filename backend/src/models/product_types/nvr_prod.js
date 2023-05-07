const mongoose = require('mongoose');

const nvr = mongoose.Schema({
  addit_info:{
    input:{type:String,required:false},
    consumption:{type:String,required:false},
    dimensions:{type:String,required:false},
    weight:{type:String,required:false},
    temp:{type:String,required:false},
    humidity:{type:String,required:false},
    safety:{type:String,required:false},
    mobile_app:{type:String,required:false},
    web_browser:{type:String,required:false}
  },
  adv_features:{
    vca_counting_solution:{type:String,required:false},
    vca_event_search:{type:String,required:false},
    smart_search_ii:{type:String,required:false},
    trend_micro_iot_security:{type:String,required:false},
    cybersecurity_managment:{type:String,required:false}
  },
  audio:{
    audio_format:{type:String,required:false},
    audio_in:{type:String,required:false},
    audio_out:{type:String,required:false}
  },
  deep_search:{
    object_search:{type:String,required:false},
    scence_search:{type:String,required:false},
    attribute_search:{type:String,required:false}
  },
  remote:{
    mobile_tablet_app:{type:String,required:false},
    web_browser:{type:String,required:false},

  },
  device:{
    os:{type:String,required:false},
    watchdog:{type:String,required:false},
    power_restoration:{type:String,required:false}
  },
  display:{
    live_view_channels:{type:String,required:false},
    live_view_specs:{type:String,required:false},
    output:{type:String,required:false},
    resolution:{type:String,required:false},
    dewarp:{type:String,required:false},
    warp:{type:String,required:false},
    ptz_oper:{type:String,required:false}
  },
  interface:{
    usb_front:{type:String,required:false},
    usb_rear:{type:String,required:false},
    alarm_in:{type:String,required:false},
    alarm_out:{type:String,required:false},
    audio_in:{type:String,required:false},
    rs485:{type:String,required:false}
  },
  network:{
    ethernet:{type:String,required:false},
    network_throughput_input_output_total:{type:String,required:false},
    poe:{type:String,required:false},
    poe_managment:{type:String,required:false},
    protocols:{type:String,required:false}
  },
  playback:{
    playback_display_channels:{type:String,required:false},
    display_spec:{type:String,required:false},
    playback_control:{type:String,required:false},
    video_search:{type:String,required:false},
    thumbnail_explorer:{type:String,required:false},
    snapshot:{type:String,required:false},
    video_clip_export:{type:String,required:false}
  },
  recording:{
    recording_time:{type:String,required:false},
    post:{type:String,required:false},
    recording_stream:{type:String,required:false},
    recording_throughput:{type:String,required:false},
    recording_mode:{type:String,required:false},
    recording_setting:{type:String,required:false},
    watermark:{type:String,required:false}
  },
  storage:{
    hdd_devices:{type:String,required:false},
    raid:{type:String,required:false},
    disk_management:{type:String,required:false},
    hdd_tech:{type:String,required:false},
    external_storage:{type:String,required:false},
    video_clip_export:{type:String,required:false},
    schedule_backup:{type:String,required:false}
  },
  system:{
    camera_integration: {type:String,required:false},
    event: {type:String,required:false},
    event_action: {type:String,required:false},
    user_management: {type:String,required:false},
    log: {type:String,required:false},
    date: {type:String,required:false},
    language: {type:String,required:false}
  },
  video:{
    format:{type:String,required:false},
    decoder:{type:String,required:false},
    resolution:{type:String,required:false},
    capability:{type:String,required:false},
    needs_keys:{type:String,required:false},
    needs_keys_1:{type:String,required:false}
  }
})

module.exports = mongoose.model('nvr_prod' , nvr);

/*
prodict code
prodict name
image
technical_images


*/
