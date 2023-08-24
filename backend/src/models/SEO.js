const mongoose = require('mongoose');

const seoMeta = new mongoose.Schema({
	meta_title: { type: String, required: true },
	meta_description: { type: String, required: false },
	meta_main_key_word: { type: String },
  meta_support_key_words: { type: Array },

});

module.exports = mongoose.model('seoMeta', seoMeta);
