const articles = require('../models/news');

async function getAllNews(req, res) {
	try {
		const result = await articles.find();
		console.log('result is',result);
		const articleArray = [];

		if (result.length === 0) {
			return res.status(404).json({ message: 'No Articles Found' });
		} else {
			result.forEach(article => {
				articleArray.push(article);
				console.log(article);
			});

			return res.json({ articles: articleArray });
		}
	} catch (err) {
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}
module.exports = getAllNews;
