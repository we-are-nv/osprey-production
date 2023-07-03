const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './uploads' });
const fs = require('fs');
const Mail = require('nodemailer/lib/mailer');

// dotenv.config();

const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.post('/', async (req, res) => {
	try {
		let mailObj = {};
		mailObj = req.body;
		res.status(200).json({ message: 'Mail sent to backend successfully', mailObj });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

module.exports = router;
