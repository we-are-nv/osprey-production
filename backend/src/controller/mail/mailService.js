const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path')
const { buildEmail } = require('./mailBuilder');
const {
	createContact,
	getAllContacts,
	getContactInfo
} = require('./contactService');

dotenv.config();

let subject = 'default_Subject';
let htmlFilePath = path.join(__dirname, '..','..', 'mail', 'templates', 'basic_email.html')
let recipient = {};
let emailType = 'welcome';

// if (emailType === 'welcome') {
// 	subject = 'Welcome to Paragon Security';
// 	htmlFilePath = path.join(__dirname, '..', 'mail', 'templates', 'basic_emai.html');
// 	// to.email = await createContact.email;
// } else if (emailType === 'Second type') {
// 	subject = 'Second Type';
// 	htmlFilePath = '../email/welcome.html';
// } else {
// 	subject = 'Default';
// 	htmlFilePath = '../email/welcome.html';
// }

// let params = {};
// params.emailType = 'welcome'; // testing
// params.subject = subject;
// params.htmlFilePath = htmlFilePath;
// params.sender = {
// 	name: 'Paragon Security',
// 	email: 'paragon.website.enquiries@gmail.com'
// };
// params.recipient = {
// 	email: createContact.email
// };

async function sendMail() {
	try {
		const params = {};
		params.emailType = 'welcome'; // testing
		params.subject = subject;
		params.htmlFilePath = htmlFilePath;
		params.sender = {
			name: 'Paragon Security',
			email: 'webservices.paragon@gmail.com'
		};
		params.recipient = {
			email: createContact.email
		};

		const success = await buildEmail(params);
		if (success) {
		}
	} catch (err) {
		console.error(err);
	}
}

module.exports = {
	sendMail
};
