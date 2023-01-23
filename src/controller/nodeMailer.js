const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// const transporter = nodemailer.createTransport({
// 	service: process.env.MAILER_HOST,
// 	host: process.env.MAILER_HOST,
// 	port: process.env.MAILER_PORT,
// 	secure: false,
// 	auth: {
// 		user: process.env.MAILER_USER,
// 		pass: process.env.MAILER_PASS
// 	}
// });

const mailTransport = {
	host: process.env.DEV_HOST,
	port: process.env.DEV_PORT,
	auth: {
		user: process.env.TEST_USER,
		pass: process.env.TEST_PASS
	}
};

function sendEmail(req) {
	let transporter = nodemailer.createTransport({ mailTransport });

	const mailOptions = {
		from: req.body.email,
		to: 'email.address@domain.com',
		subject: `Message from ${req.body.email} about`,
		text: `Message from: ${req.body.name}.
		Email: ${req.body.email}.
		Tel no: ${req.body.telephone}.
		Message: ${req.body.message}.
		Consent: ${req.body.consent}`
	};
	return transporter.sendMail(mailOptions);
}

router.post('/mail', async (req, res) => {
	console.log('post');
	try {
		await sendEmail(req);
		console.log('success with nodemailer');
		res.sendStatus(200);
	} catch (err) {
		console.log('error', err);
		res.send('error');
	}
});

module.exports = router;
