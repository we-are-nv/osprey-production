const express = require('express');
const cluster = require('cluster');
const os = require('os');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const logger = require('./src/utils/logger');
const mongoose = require('mongoose');
var multer = require('multer');
var forms = multer();
const app = express();

const productRoute = require('./src/routes/products');
const catRoute = require('./src/routes/category');
const modelRoute = require('./src/routes/model');
const infoRoute = require('./src/routes/information');
const authRoute = require('./src/routes/auth');

const PORT = process.env.PORT || 3030;

mongoose.set('strictQuery', true);
mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Connected to Database');
	})
	.catch(err => {
		console.log('Connection Failed' + err);
	});

if (process.env.NODE_ENV === 'development') {
	clusterWorkerSize = 1;
} else {
	clusterWorkerSize = os.cpus().length;
}

const middlewareCheck = (req, res, next) => {
	if (req.method === 'POST') {
		console.log('REQ HOST: ' + req.get('host'));
		console.log('REQ ROUTE: ' + req.originalUrl);
		console.log('REQ BODY:');
		//console.log(req.body);
	}
	next();
};

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(middlewareCheck);

app.use((req, res, next) => {
	const origin = req.headers.origin;
	const allowedOrigins = [
		'https://staging.wearenv.co.uk',
		'http://localhost:4200',
		'https://localhost'
	];
	if (allowedOrigins.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, prod'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS, PUT'
	);
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

// app.get('/', (req, res, next) => {
// 	// console.log(constOrigin);
// 	next();
// });

app.get('/paragon/api-test', (req, res) => {
	console.log('Received request to /api-test');
	console.log(req.origin);
	res.send('test');
});

app.get('/paragon/api/status', (req, res) => {
	// console.log(constOrigin);
	logger.info('Checking the API status: Everything is OK');
	res.status(200).send({
		status: 'UP',
		message: 'The API is up and running!'
	});
});

app.use('/paragon/api/products', productRoute);
app.use('/paragon/api/auth', authRoute);
app.use('/paragon/api/model', modelRoute);
app.use('/paragon/api/info', infoRoute);
//Category Routes
app.use('/paragon/api/products/category', catRoute);
app.use('/paragon/api/products/categories', catRoute);

const start = () => {
	app.listen(PORT, () => {
		// console.log('CORS Origin is: ', constOrigin);
		console.log(
			`Server listening on port ${PORT} and worker process ${process.pid}`
		);
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
