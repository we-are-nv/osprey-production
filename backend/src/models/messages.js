const mongoose = require('mongoose');


const customerMessages = mongoose.Schema({
	message_subject: {type: String, required: true},
	message: { type: String, required: false },
	creation_time: {type: Number, required: true}
})


module.exports = mongoose.model('Messages', customerMessages)