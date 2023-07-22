const mongoose = require('mongoose');




const accreInfo = mongoose.Schema({

  type: { type: String, required: true },
  data: { type: Array, required: true }

})


module.exports = mongoose.model('accred', accreInfo);
