const NodeCache = require('node-cache');

const cache = new NodeCache();

function dataCache(req, res, next) {
	const cacheKey = req.originalUrl + JSON.stringify(req.query);

	cache.set(cacheKey, data, 3600);

	const cachedData = cache.get(cacheKey);
	if (cachedData) {
		console.log('data retrieved from cache successfully');
		return res.json(cachedData);
	}
	next();
}

function flushCache(req, res) {
	cache.flushAll();
}

module.exports = { dataCache, flushCache };
