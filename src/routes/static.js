const express = require('express');
const controllers = require('../controller/controllers');
const dbQuery = require('../controller/dbQuery');
var breadcrumbs = require('../controller/breadcrumbs');

const router = express.Router();

router.get('/db-connector-test', async (req, res) => {
	try {
		var data = {};
		const message = 'Results from camInfo are: ';
		let results = await dbQuery.genericQuery('SELECT * FROM `info`');

		data = {
			message: message,
			results: results
		};
		res.send(data);
	} catch (e) {
		console.error(e);
	}
});

// Home & Static Pages

router.get('/', (req, res) => {
	// res.send(process.env);
	res.render('index');
});

router.get('/new-site', (req, res) => {
	res.render('index3');
});

// Other Static

router.get('/about', breadcrumbs.Middleware(), (req, res) => {
	res.render('about', { breadcrumbs: req.breadcrumbs });
});

router.get('/contact-us', breadcrumbs.Middleware(), (req, res) => {
	res.render('contact', { breadcrumbs: req.breadcrumbs });
});

router.get('/products', breadcrumbs.Middleware(), (req, res) => {
	res.render('product-collection', { breadcrumbs: req.breadcrumbs });
});

router.get('/services', breadcrumbs.Middleware(), (req, res) => {
	res.render('services-collection', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources', breadcrumbs.Middleware(), (req, res) => {
	res.render('resources', { breadcrumbs: req.breadcrumbs });
});

router.get('/certifications', breadcrumbs.Middleware(), (req, res) => {
	res.render('certifications', {
		breadcrumbs: req.breadcrumbs,
		atexmarking: require('../tableData/atexmarkingsystem.json'),
		ingress: require('../tableData/ingress.json'),
		nema: require('../tableData/nema.json')
	});
});

router.get('/news', breadcrumbs.Middleware(), (req, res) => {
	res.render('news', { breadcrumbs: req.breadcrumbs });
});

router.get('/privacy', breadcrumbs.Middleware(), (req, res) => {
	res.render('privacy', { breadcrumbs: req.breadcrumbs });
});

router.get('/terms-and-conditions', breadcrumbs.Middleware(), (req, res) => {
	res.render('terms', { breadcrumbs: req.breadcrumbs });
});

// Services Routes

router.get('/services/system-design', breadcrumbs.Middleware(), (req, res) => {
	res.render('system-design-build', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/installations', breadcrumbs.Middleware(), (req, res) => {
	res.render('installations', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/service-support', breadcrumbs.Middleware(), (req, res) => {
	res.render('service-support', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/training', breadcrumbs.Middleware(), (req, res) => {
	res.render('training', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/consultancy', breadcrumbs.Middleware(), (req, res) => {
	res.render('consultancy', { breadcrumbs: req.breadcrumbs });
});

router.get('/services/risk', breadcrumbs.Middleware(), (req, res) => {
	res.render('risk-assessment', { breadcrumbs: req.breadcrumbs });
});

// Resources

router.get('/resources', breadcrumbs.Middleware(), (req, res) => {
	res.render('resources', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/datasheets', breadcrumbs.Middleware(), (req, res) => {
	res.render('datasheets', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/gallery', breadcrumbs.Middleware(), (req, res) => {
	res.render('gallery', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/knowledge', breadcrumbs.Middleware(), (req, res) => {
	res.render('knowledge-centre', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/tools', breadcrumbs.Middleware(), (req, res) => {
	res.render('tools', { breadcrumbs: req.breadcrumbs });
});

router.get('/resources/press', breadcrumbs.Middleware(), (req, res) => {
	res.render('press', { breadcrumbs: req.breadcrumbs });
});

module.exports = router;
