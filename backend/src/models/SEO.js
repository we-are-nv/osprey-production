const mongoose = require('mongoose');

const seoMeta = new mongoose.Schema({
	meta_title: { type: String, required: true },
	meta_description: { type: String, required: false },
	meta_key_words: [{ type: string }],
	
});

module.exports = mongoose.model('seoMeta', seoMeta, 'seoMetas');
