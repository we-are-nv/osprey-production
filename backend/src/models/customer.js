const mongoose = require('mongoose');
const customerMessages = require('./messages');

const customerSchema = mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, match: /.+\@.+\..+/ },
	phone_number: { type: String, required: true },
	organisation: { type: String, required: false },
	location: { type: String, required: false },
	messages: [
		{
			_id: false,
			message_id: { type: mongoose.Schema.Types.ObjectId, ref: 'customerMessages' },
			message_subject: { type: String, required: true }
		}
	]
});

module.exports = mongoose.model('Customer', customerSchema);
