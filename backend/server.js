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
const app = express();

const productRoute = require('./src/routes/products');
const catRoute = require('./src/routes/category');
const modelRoute = require('./src/routes/model');
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

if (process.env.LOCAL) {
	origin = process.env.CORS_DEV;
} else {
	origin = process.env.CORS;
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

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(morgan('dev'));
app.use(middlewareCheck);

app.get('/', (req, res) => {
	console.log(origin);
});

app.get('/paragon/api-test', (req, res) => {
	console.log('Received request to /api-test');
	console.log(req.origin);
	res.send('test');
});



app.get('/paragon/api/status', (req, res) => {
	console.log(origin);
	logger.info('Checking the API status: Everything is OK');
	res.status(200).send({
		status: 'UP',
		message: 'The API is up and running!'
	});
});

app.use('/paragon/api/product', productRoute);
app.use('/paragon/api/auth',authRoute);
app.use('/paragon/api/model', modelRoute);

//Category Routes
app.use('/paragon/api/product/category',catRoute);
app.use('/paragon/api/product/categories',catRoute);


const start = () => {
	app.listen(PORT, () => {
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
