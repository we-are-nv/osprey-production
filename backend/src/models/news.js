const mongoose = require('mongoose');

const articles = mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: String, required: false },
		publish_date: { type: String, required: false },
		images: [{ type: String}]
	},
	{ collection: 'articles' }
);

module.exports = mongoose.model('articles', articles);
