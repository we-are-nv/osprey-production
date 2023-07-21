const mongoose = require('mongoose');

const infoPage = mongoose.Schema({
  name: { type: String, required: true },
  elements: [
    {
      type: { type: String, required: true },
      header: { type: String, required: false },
      text: { type: String, required: false },
      src: { type: Array, required: false }
    }
  ],
  searchType: { type: String, required: false },

});

module.exports = mongoose.model('info-pages', infoPage);
