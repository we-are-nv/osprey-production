const express = require('express');
const controllers = require('../controller/controllers.js');
const dbQuery = require('../controller/dbQuery');
var breadcrumbs = require('../controller/breadcrumbs');


const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});
router.get('/info', breadcrumbs.Middleware(), async (req, res) => {
    try {
        var data = {}

        var sqlQuery  = 'SELECT DISTINCT category FROM info'
        data = await dbQuery.genericQuery(sqlQuery)
    } catch (error) {
        console.log(error)
    }
    var sendArray = []
    for (idx in data) {
        sendArray.push(data[idx].category)
    }
    res.json({
        data:sendArray,
        breadcrumbs:req.breadcrumbs
    })
})

router.get('/info-markets/:category', breadcrumbs.Middleware(), async (req, res) => {

    try {
		var data = {};
		var sqlQuery = 'SELECT * FROM info WHERE category = "'+req.params.category+'" ';
		data = await dbQuery.genericQuery(sqlQuery);
	} catch (error) {
		consolee.log(error);
        errorMessage = {"message":error}
	}
    if (data.length == 0){
        errorMessage = {"message":"CATNOTFOUND"}
    } else {
        errorMessage = {}
    }
    res.json({
        error:errorMessage || {},
        data:data,
        breadcrumbs:req.breadcrumbs
    })
})

router.get('/products/cctv', breadcrumbs.Middleware(), async (req, res) => {

    try {
		var data = {};
        var queryedChanges = req.query;
        var keyArray = new Array();
        var paramArray = new Array();
        var inOr = false;
        console.log(req.query)
        for (const [key, value] of Object.entries(req.query)) {
            keyArray.push(key)
            paramArray.push(value)

        }
        console.log(keyArray)
        console.log(paramArray)
        if (keyArray.length != 0){
            var queryParams = ' WHERE ';
        } else {
            var queryParams = '';
        }

        for (idx in keyArray){
            if (keyArray[idx] == 'orStart') {
                inOr = true;

                queryParams += '('
            } else if (keyArray[idx] == 'orEnd') {
                inOr =false
                queryParams += ')'
            } else {
                queryParams += keyArray[idx] + ' = "' + paramArray[idx] + '"';
            }
            if (Number(idx) + 1 < keyArray.length && keyArray[idx] != "orStart" && keyArray[Number(idx) + 1] != "orEnd" && inOr){
                queryParams += ' OR ';
            }
            if (Number(idx) + 1 < keyArray.length && !inOr){
                queryParams += ' AND ';
            }

        };
        console.log(queryParams)
		var sqlQuery = 'SELECT * FROM info' + queryParams
		data = await dbQuery.genericQuery(sqlQuery);
	} catch (error) {
		console.log(error);

	}
    if (!data){
        errorMessage = {"message":"ITEMSNOTFOUND","friendly":"Items were not found with the selected parameters"}
        data = [];
    } else {
        errorMessage = {}
    }
    res.json({
        error:errorMessage || {},
        amountFound:data.length || 0,
        params:req.query,
        data:data,
        breadcrumbs:req.breadcrumbs
    })
})



module.exports = router;
