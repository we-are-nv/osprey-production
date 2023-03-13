const express = require('express');
const bodyParser = require('body-parser');
const db = require('./dbConnector');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function getAllInfo(req) {
	try {
		results = await db.id('SELECT * FROM info WHERE product_code = ?', [
			req.params.product_code
		]);
		return results;
	} catch (e) {
		console.log(e);
		const status = 500;
		return status;
	}
}

async function getAllFeatures(req) {
	try {
		results = await db.id('SELECT * FROM features WHERE product_code = ?', [
			req.params.product_code
		]);
		return results;
	} catch (e) {
		console.log(e);
		const status = 500;
		return status;
	}
}

async function getConcatFeatures(req) {
	try {
		results = await db.id(
			'SELECT features_concat FROM features WHERE product_code = ?',
			[req.params.product_code]
		);
		return results;
	} catch (e) {
		console.log(e);
		const status = 500;
		return status;
	}
}

async function getAV(req) {
	try {
		results = await db.id('SELECT * FROM av WHERE product_code = ?', [
			req.params.product_code
		]);
		console.log('getAV' + results)
		return results;
	} catch (e) {
		console.log(e);
		const status = 500;
		return status;
	}
}

async function getMovement(req) {
	try {
		results = await db.id('SELECT * FROM `pan_tilt` WHERE product_code = ?', [
			req.params.product_code
		]);
		return results;
	} catch (e) {
		console.log(e);
		const status = 500;
		return status;
	}
}

async function getPhysical(req) {
	try {
		results = await db.id('SELECT * FROM physical WHERE product_code = ?', [
			req.params.product_code
		]);
		return results;
	} catch (e) {
		console.log(e);
		const status = 500;
		return status;
	}
}

async function getPower(req) {
	try {
		results = await db.id('SELECT * FROM `power_conn` WHERE product_code = ?', [
			req.params.product_code
		]);
		return results;
	} catch (e) {
		console.log(e);
		const status = 500;
		return status;
	}
}

async function getCerts(req) {
	try {
		results = await db.id('SELECT * FROM `certification` WHERE product_code = ?', [
			req.params.product_code
		]);
		return results;
	} catch (e) {
		console.log(e);
		const status = 500;
		return status;
	}
}

async function getData(sqlQuery, params) {
	try {
		let results = await db.id(sqlQuery, params);
		return results;
	} catch (e) {
		console.log(e);
		// const status = 500;
		// return status;
	}
}
async function searchData(params) {
	try {
		let searchedTables = [{ tableName: 'info', product_type: 'cameras', displayed_values: ['product_code', 'product_name'] }, { tableName: 'acc_info', product_type: 'cctv-accessories', displayed_values: ['product_code', 'product_name'] }, { tableName: 'eth_info', product_type: 'cctv-transmission', displayed_values: ['product_code', 'product_name'] }, { tableName: 'housings_info', product_type: 'camera_housing', displayed_values: ['product_code', 'product_name'] }, { tableName: 'nvr_info', product_type: 'nvr', displayed_values: ['product_code', 'product_name'] }, { tableName: 'disk_nvr_info', product_type: 'disk', displayed_values: ['product_code', 'product_name'] }];
		let results = [];
		for (searchIdx in searchedTables) {
			var displayed_values = searchedTables[searchIdx].displayed_values;
			var selectedTable = searchedTables[searchIdx];
			for (valueIdx in displayed_values) {
				let result = await db.id(`SELECT ` + displayed_values.join(",") + `,'` + selectedTable.product_type + `' AS product_type from ` + selectedTable.tableName + ` WHERE ` + displayed_values[valueIdx] + ` LIKE ?;`,params);
				for (resultIdx in result) {
					results.push(result[resultIdx]);
				};
			}
		};

		return results;
	} catch (e) {
		console.log(e);
		// const status = 500;
		// return status;
	}
}

async function getHeaders(params){
	try {

		let results = await db.id(`DESC `+params)

		return results;
	} catch (e) {
		console.log(e);
		// const status = 500;
		// return status;
	}
}

async function genericQuery(sqlQuery) {
	try {
		let results = await db.all(sqlQuery);
		return results;
	} catch (e) {
		return console.log(e);
	}
}

// async function queryAll(tableArr) {
// 	let mappedData = {};
// 	for (let i = 0; i < tableArr.length; i++){
// 		let table = tableArr[i];
// 		mappedData[tableArr[i]] = await dbQuery.getData(
// 			`SELECT * FROM \`${table}\` WHERE \`product_code\` = ? `,
// 			[req.params.product_code]
// 		)

// 	}
// 	return mappedData;
// }




module.exports = {
	getAllInfo,
	getAllFeatures,
	getAV,
	getMovement,
	getConcatFeatures,
	getPhysical,
	getPower,
	getCerts,
	genericQuery,
	getData,
	searchData,
	getHeaders
};
