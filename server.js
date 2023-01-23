const express = require('express');
const cluster = require('cluster');
const os = require('os');
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');


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

app.use('/public', express.static('./src/public'));

app.use(middlewareCheck);
app.use(morganMiddleware);

app.use(require('./src/routes/pageRoutes'));
app.use(require('./src/controller/nodeMailer'))


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
// 	console.log(`server listening on port ${PORT}`);
// });
