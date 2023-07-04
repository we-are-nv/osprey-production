const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.MAIL_API;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

async function buildEmail(params) {
	try {
		sendSmtpEmail.emailType = params.emailType;
		sendSmtpEmail.subject = params.subject;
		sendSmtpEmail.htmlFilePath = params.htmlFilePath;
		console.log('sendSMTPEmail object : ', sendSmtpEmail);

		// return;
		// const htmlContent = (sendSmtpEmail.subject = params.subject);
		sendSmtpEmail.htmlContent = fs.readFile(
			params.htmlFilePath,
			'utf8',
			async (err, template) => {
				if (err) {
					return res.status(500).send('Error loading email template');
				}
				template = await fs.promises.readFile(params.htmlFilePath, 'utf8');
				const firstName = params.firstName;
				const lastName = params.lastName;
				const email = params.email;
				const personalizedTemplate = template
					.replace('[firstName]', firstName)
					.replace('[lastName]', lastName);
			}
		);
		sendSmtpEmail.sender = params.sender;
		sendSmtpEmail.to = params.to;
		sendSmtpEmail.replyTo = params.replyTo;
		sendSmtpEmail.headers = params.headers;
		sendSmtpEmail.params = params.params;

		const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
		console.log(
			'API.sendTransacEmail called successfully. Returned data: ' +
				JSON.stringify(data)
		);
	} catch (err) {
		console.error(err);
	}
}

module.exports = {
	buildEmail
};
