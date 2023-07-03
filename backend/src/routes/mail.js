const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads' });
const fs = require('fs');
const Customer = require('../models/customer');
const { sendMail } = require('../controller/mail/mailService.js');

// dotenv.config();

const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.post('/', async (req, res) => {
	try {
		const {
			first_name,
			last_name,
			email,
			phone_number,
			organisation,
			location,
			message,
			subject
		} = req.body;

		const contact = {}
			contact.firstName = first_name
			contact.lastName = last_name
			contact.email = email
			contact.subject = 'Welcome to Paragon Security'
		// let successMessage = 1;

		const successMessage = await sendMail(contact);
		if (!successMessage) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error. Mail not sent' });
		} else {
			const newCustomer = new Customer({
				first_name,
				last_name,
				email,
				phone_number,
				organisation,
				location,
				message,
				subject
			});

			await newCustomer.save();
		}
		res.status(200).json({ message: 'Mail sent to backend successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

module.exports = router;

// res
// 	.status(201)
// 	.json({
// 		message: `Customer: ${newCustomer.first_name} +${newCustomer.last_name} creation sucessful`
// 	});

// }

// let mailObj = {};
// mailObj = req.body;
// const data = await customer.find;
