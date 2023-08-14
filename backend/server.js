// Import Modules
const express = require('express');
const cluster = require('cluster');
const os = require('os');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const mongoose = require('mongoose');
var multer = require('multer');
var forms = multer();
const app = express();

// Import cacheMiddleware

const cacheMiddleware = require('./middleware/cache');

//Import Scripts
const logger = require('./src/utils/logger');

// Import Routes
const productRoute = require('./src/routes/products');
const catRoute = require('./src/routes/category');
const modelRoute = require('./src/routes/model');
const infoRoute = require('./src/routes/information');
const authRoute = require('./src/routes/auth');
const searchRoute = require('./src/routes/search');
const seoRoute = require('./src/routes/seo');
const mailRoute = require('./src/routes/mail');
const newsRoute = require('./src/routes/news.js');
const invalidateCache = require('./src/routes/invalidateCache');

const s3Controller = require('./src/controller/s3-controller');
// Declare Ports
const PORT = process.env.PORT || 3030;

// Mongoose Setup
mongoose.set('strictQuery', true);
mongoose
	.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		minPoolSize: 5,
		maxPoolSize: 240
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

app.use(cacheMiddleware.dataCache);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));
app.use(middlewareCheck);
app.use(express.json());

const addTimestamp = (req, res, next) => {
	req.timestamp = new Date().toLocaleString();
	next();
};

app.use(addTimestamp);

app.use((req, res, next) => {
	const origin = req.headers.origin;

	// Code to remove Port from localhost addresses - sorry, Paolo

	const allowedOrigins = [
		'https://staging.wearenv.co.uk',
		'http://localhost:4200',
		'http://localhost:4300',
		'http://18.132.33.23:4000',
		'http://localhost:55135'
	];


	if (allowedOrigins.includes(origin)) {
		//console.log('ALLOWED CORS');
		//console.log(origin);
		res.setHeader('Access-Control-Allow-Origin', origin);
		res.setHeader('Access-Control-Allow-Credentials', true);
		res.setHeader('Access-Control-Allow-Headers', origin);
	} else {
		console.log('DISALLOWED CORS');
	}

	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization, Prod'
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
app.get('/', (req, res) => {
	const timestamp = req.timestamp;
	res.send(`timestamp: ${timestamp}`);
});

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

// Invalidate Cache Route

app.use('/paragon/api/products', productRoute);
app.use('/paragon/api/auth', authRoute);
app.use('/paragon/api/model', modelRoute);
app.use('/paragon/api/manage-seo',seoRoute);
app.use('/paragon/api/info', infoRoute);
//Category Routes
app.use('/paragon/api/products/category', catRoute);
app.use('/paragon/api/products/categories', catRoute);
// Search route
app.use('/paragon/api/search', searchRoute);
// News route
app.use('/paragon/api/news', newsRoute);
// Mail route
app.use('/paragon/api/mail', mailRoute);
// Flush Cache
app.use('/paragon/api/flush-cache', invalidateCache);
const start = () => {
	app.listen(PORT, () => {
		// console.log('CORS Origin is: ', constOrigin);
		console.log(
			`Server listening on port ${PORT} and worker process ${
				process.pid
			}\nTime: ${Date.now()}`
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
