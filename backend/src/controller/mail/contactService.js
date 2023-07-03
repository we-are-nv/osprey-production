const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

let apiKey = defaultClient.authentications['api-key'];

apiKey.apiKey = process.env.MAIL_API;

let apiInstance = new SibApiV3Sdk.ContactsApi();

// Contacts

async function createContact(contact) {
	try {
		const createContact = new SibApiV3Sdk.CreateContact(contact);
		await apiInstance.createContact(createContact).then(data => {
			console.log(
				'Brevo API called successfully. Returned data:' + JSON.stringify(data)
			);
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error', err });
	}
}

async function getContactInfo(identifier) {
	try {
		const data = await apiInstance.getContactInfo(identifier);
		console.log(
			'API.getContactInfo called successfully. Returned data: ' +
				JSON.stringify(data)
		);
	} catch (err) {
		console.error(err);
	}
}

async function getAllContacts(options) {
	try {
		if (!options) {
			return console.log('No options set');
		}
		const allContacts = await apiInstance.getContacts(options);
		console.log(
			'API.getAllContacts called successfully. Returned data: ' +
				JSON.stringify(allContacts)
		);
	} catch (err) {
		console.error(err);
	}
}

module.exports = {
	createContact,
	getContactInfo,
	getAllContacts
};
