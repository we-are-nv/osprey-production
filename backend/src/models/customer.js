const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
	first_name: { type: String, required: true },
	last_name: { type: String, required: true },
	email: { type: String, required: true, match: /.+\@.+\..+/ },
	phone_number: { type: String, required: true },
	organisation: { type: String, required: false },
	location: { type: String, required: false },
	message: { type: String, required: false }
});

module.exports = mongoose.model('Customer', customerSchema);

