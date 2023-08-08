const mongoose = require('mongoose');
const seo_meta = require('./SEO')

const articles = mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: String, required: false },
		publish_date: { type: String, required: false },
		images: [{ type: String}],
    seo: {
      type: mongoose.Schema.Types.ObjectId,
      ref:seo_meta,
      required:false
    },
	},

	{ collection: 'articles' }
);

module.exports = mongoose.model('articles', articles);
