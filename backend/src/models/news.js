const mongoose = require('mongoose');

const newsArticle = mongoose.Schema(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		author: { type: String, required: false },
		publish_date: { type: String, required: false },
		images: [
			{
				image: { type: String, unique: true }
			}
		]
	},
	{ collection: 'articles' }
);

module.exports = mongoose.model('news_article', newsArticle);
