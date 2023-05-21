const express = require('express');
const cluster = require('cluster');
const os = require('os');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('./src/utils/logger');
const mongoose = require('mongoose');
const app = express();

//const staticRoutes = require('./src/routes/static');
const serviceRoute = require('./src/routes/products');
const modelRoute = require('./src/routes/model');

const PORT = process.env.PORT || 3030;

if (process.env.NODE_ENV == "development") {
  clusterWorkerSize = 1;
} else {
  clusterWorkerSize = os.cpus().length;
}

app.set('view engine', 'ejs');
app.set('views', path.resolve('./src/views'));

if (process.env.LOCAL) {
	origin = process.env.CORS_DEV;
} else {
	origin = process.env.CORS;
}

app.use(
	cors({
		origin: origin
	})
);

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

const middlewareCheck = (req, res, next) => {
  if (req.method === 'POST') {
    console.log('REQ HOST: ' + req.get('host'));
    console.log('REQ ROUTE:');
    console.log(req.route);
    console.log('REQ BODY:');
    //console.log(req.body);
  }
  next();
  if (res.status === 404) {
    console.log('ERROR RESPONSE:');
    console.log(res);
  }
};

app.use(bodyParser.json());
app.use(middlewareCheck);
//app.use(morganMiddleware);

app.get('/api/status', (req, res) => {
  logger.info('Checking the API status: Everything is OK');
  res.status(200).send({
    status: 'UP',
    message: 'The API is up and running!'
  });
});
app.use('/api/service', serviceRoute);
app.use('/api/product',serviceRoute);
app.use('/api/model',modelRoute)

//app.use('/', staticRoutes);

const start = () => {
  app.listen(PORT, (req, res) => {
    //console.log(`server listening on port ${PORT} and worker ${process.pid}`);
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
