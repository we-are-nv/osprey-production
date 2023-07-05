require('dotenv').config();
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

const smtp = {
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // use TLS

	auth: {
		user: process.env.SMTP_EMAIL,
		pass: process.env.SMTP_PASS
	}
};

async function sendNodeMail(contact) {
	try {
		const transport = nodemailer.createTransport(smtp);
		const htmlFilePath = path.join(
			__dirname,
			'..',
			'..',
			'mail',
			'templates',
			'basic_email.html'
		);
		const template = fs.readFileSync(
			path.join(__dirname, '..', '..', 'mail', 'templates', 'basic_email.html'),
			'utf8'
		);

		console.log(contact);

		// template not working...

		let mailOptions = {
			from: smtp.auth.user,
			to: contact.email, // change
			mailSubject: 'Welcome to Paragon Security',
			html: template
				.replace('[firstName]', contact.firstName)
				.replace('[lastName]', contact.lastName)
				.replace('[messageSubject]', contact.messageSubject)
		};

		const info = await transport.sendMail(mailOptions);
		return { messageId: info.messageId };
	} catch (err) {
		console.error(err);
		throw new Error(
			`An error occurred while attempting to send the mail. Error: ${err}`
		);
	}
}

module.exports = {
	sendNodeMail
};
