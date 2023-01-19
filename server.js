const express = require('express');
const cluster = require('cluster');
const os = require('os');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const clusterWorkerSize = os.cpus().length;

const morganMiddleware = require('./src/utils/morgan.middleware');
const logger = require('./src/utils/logger');
const app = express();

const middlewareCheck = (req, res, next) => {
	if (req.method === 'POST') {
		console.log('REQ HOST: ' + req.get('host'));
		console.log('REQ ROUTE:');
		console.log(req.route);
		console.log('REQ BODY:');
		console.log(req.body);
	}
	next();
	if (res.status === 404) {
		console.log('ERROR RESPONSE:');
		console.log(res);
	}
};

const PORT = process.env.PORT || 3030;

app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

app.use(bodyParser.json());

app.get('/api/status', (req, res) => {
	logger.info('Checking the API status: Everything is OK');
	res.status(200).send({
		status: 'UP',
		message: 'The API is up and running!'
	});
});

// app.use((req, res, next) => {
// 	const err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

// app.use((err, req, res, next) => {
// 	res.locals.error = err;
// 	const status = err.status || 500;
// 	res.status(status);
// 	console.error(err)
// 	// res.render('error');
// });

app.use('/public', express.static('./src/public'));

app.use(middlewareCheck);
app.use(morganMiddleware);

app.use(require('./src/routes/pageRoutes'));

// const transporter = nodemailer.createTransport({
// 	service: 'smtp.ionos.co.uk',
// 	host: 'smtp.ionos.co.uk',
// 	port: 587,
// 	secure: false,
// 	auth: {
// 		user: '',
// 		pass: ''
// 	}
// });

function sendEmail(req) {
	let transporter = nodemailer.createTransport({
		host: 'smtp.mailtrap.io',
		port: 2525,
		auth: {
			user: '7330c4a50e1274',
			pass: '55b9a417dc916b'
		}
	});
	const mailOptions = {
		from: req.body.email,
		to: 'info@ospreysecurity.co.uk',
		subject: `Message from ${req.body.email} about`,
		text: `Message from: ${req.body.name}.
		Email: ${req.body.email}.
		Tel no: ${req.body.telephone}.
		Message: ${req.body.message}.
		Consent: ${req.body.consent}`
	};
	return transporter.sendMail(mailOptions);
}

app.post('/', async (req, res) => {
	try {
		await sendEmail(req);
		console.log('success with nodemailer');
		res.sendStatus(200);
	} catch (err) {
		console.log('error', err);
		res.send('error');
	}
});

const start = () => {
	app.listen(PORT, (req, res) => {
		console.log(`server listening on port ${PORT} and worker ${process.pid}`);
	});
};

if (clusterWorkerSize > 1) {
	if (cluster.isMaster) {
		for (let i = 0; i < clusterWorkerSize; i++) {
			cluster.fork();
		}
		cluster.on('exit', function (worker) {
			console.log('Worker', worker.id, 'has exited.');
		});
	} else {
		start();
	}
} else {
	start();
}

// app.listen(PORT, (req, res) => {
// 	console.log(`server running on port ${PORT}`);
// 	console.log(process.env.DB_USER);
// });
