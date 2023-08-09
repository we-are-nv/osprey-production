const NodeCache = require('node-cache');

const cache = new NodeCache();

function dataCache(req, res, next) {
	const cacheKey = req.originalUrl + JSON.stringify(req.query);

	cache.ttl(cacheKey, 3600);

	const cachedData = cache.get(cacheKey);
	if (cachedData) {
		console.log('data retrieved from cache successfully');
		return res.json(cachedData);
	}
	next();
}

function flushCache(req, res) {
	try {
		cache.flushAll();
		res.status(200).json({ message: 'Cache Emptied Sucessfully' });
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
}

module.exports = { dataCache, flushCache };
