const mongoose = require('mongoose');

const overviewSchema = new mongoose.Schema({
  seo: {
    meta_title: { type: String, required: true },
    meta_description: { type: String, required: false },
    meta_key_words: { type: Array },
  },
  content:{ type: Object }

});

module.exports = mongoose.model('overview', overviewSchema);
