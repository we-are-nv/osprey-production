const express = require('express');
const controllers = require('../controller/controllers');
const dbQuery = require('../controller/dbQuery');
var breadcrumbs = require('../controller/breadcrumbs');

const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});


router.get('/markets/marine', breadcrumbs.Middleware(), async (req, res) => {
    try {
		var data = {};
		var sqlQuery = 'SELECT * FROM info WHERE category = "marine" ';
		data = await dbQuery.genericQuery(sqlQuery);
	} catch (error) {
		consolee.log(error);
	}
    console.log(data)
    res.json({
        data:data,
        breadcrumbs:req.breadcrumbs
    })
})


module.exports = router;
