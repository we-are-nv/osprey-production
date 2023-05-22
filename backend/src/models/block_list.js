const mongoose = require('mongoose');
const categorys = require('./categories');

const blockList = mongoose.Schema({
	category: { type: mongoose.Schema.Types.ObjectId, ref: categorys },
	data: { type: Array, required: true }
});

module.exports = mongoose.model('block_list', blockList);
