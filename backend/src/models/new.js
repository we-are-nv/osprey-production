const mongoose = require('mongoose');


const newsSchema = mongoose.Schema({
	title: {type: String, required: true},
	content: { type: String, required: false },
	image_array: {type: Array, required: true},
  author: {type: String, required: true},
  date: {type: String, required: true},

})


module.exports = mongoose.model('new', newsSchema)
