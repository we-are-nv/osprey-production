const express = require('express');
const nodeCache = require('node-cache');
const cacheMiddleware = require('../../middleware/cache');

const router = express.Router();

router.post('/', cacheMiddleware.flushCache);

module.exports = router;
