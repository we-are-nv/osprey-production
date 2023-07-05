const express = require('express');
const { sendNodeMail } = require('../controller/mail/nodemailer');
const multer = require('multer');
const upload = multer({ dest: './uploads' });
const fs = require('fs');
const Customer = require('../models/customer');
const Message = require('../models/messages');
// const { sendMail } = require('../controller/mail/mailService');
// dotenv.config();

const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.post('/', async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			email,
			phoneNumber,
			organisation,
			location,
			messageSubject,
			message
		} = req.body;
		console.log(req.body);

		// return
		const mailOptions = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			mailSubject: 'Welcome to Paragon Security'
			// let successMessage = 1;
		};
		const successMessage = await sendNodeMail(mailOptions);
		if (!successMessage) {
			return res
				.status(500)
				.json({ message: 'Internal Server Error. Mail not sent' });
		}
		const newMessage = new Message({
			message_subject: messageSubject,
			message: message,
			creation_time: Date.now()
		});

		let customer = await Customer.findOne({ email: email });
		if (customer) {
			console.log(customer);

			customer.messages.push({
				message_id: newMessage.id,
				message_subject: newMessage.message_subject
			});
			await customer.save();
			await newMessage.save();
		} else {
			const newCustomer = new Customer({
				first_name: firstName,
				last_name: lastName,
				email: email,
				phone_number: phoneNumber,
				organisation: organisation,
				location: location,
				messages: [
					{
						message_id: newMessage._id,
						message_subject: newMessage.message_subject
					}
				]
			});
			await newCustomer.save();
		}
		res.status(200).json({ message: 'Mail sent to backend successfully' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error', err });
	}
});

module.exports = router;


