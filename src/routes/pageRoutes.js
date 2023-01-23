const express = require('express');
const controllers = require('../controller/controllers');
const dbQuery = require('../controller/dbQuery');
var breadcrumbs = require('../controller/breadcrumbs');
const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// DB Connection Test

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

// Home & Static PAges

router.get('/', (req, res) => {
	// res.send(process.env);
	res.render('index');
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

router.get('/certifications', breadcrumbs.Middleware(), (req, res) => {
	res.render('certifications', { breadcrumbs: req.breadcrumbs });
});

router.get('/news', breadcrumbs.Middleware(), (req, res) => {
	res.render('news', { breadcrumbs: req.breadcrumbs });
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

// Markets

router.get('/markets/marine', breadcrumbs.Middleware(), async (req, res) => {
	try {
		var data = {};
		var sqlQuery = 'SELECT * FROM info WHERE category = "marine" ';
		data = await dbQuery.genericQuery(sqlQuery);
	} catch (error) {
		consolee.log(error);
	}

	res.render('marine', {
		data: data,
		breadcrumbs: req.breadcrumbs
	});
});

router.get('/markets/marine-onshore', breadcrumbs.Middleware(), (req, res) => {
	res.render('marine-onshore', { breadcrumbs: req.breadcrumbs });
});

router.get('/markets/marine-offshore', breadcrumbs.Middleware(), (req, res) => {
	res.render('marine-offshore', {
		breadcrumbs: req.breadcrumbs
	});
});

router.get('/markets/oil-and-gas', breadcrumbs.Middleware(), (req, res) => {
	res.render('oil-and-gas', {
		breadcrumbs: req.breadcrumbs
	});
});

router.get('/hazardous-areas', breadcrumbs.Middleware(), async (req, res) => {
	try {
		var data = {};
		var sqlQuery = 'SELECT * FROM info WHERE category = "hazardous" ';
		data = await dbQuery.genericQuery(sqlQuery);
	} catch (error) {
		consolee.log(error);
	}

	res.render('hazardous-areas', {
		data: data,
		breadcrumbs: req.breadcrumbs
	});
});

// CCTV Collection Page

router.get('/products/cctv', breadcrumbs.Middleware(), (req, res) => {
	res.render('cctv-collection', {
		breadcrumbs: req.breadcrumbs
	});
});

// Cameras

router.get(
	'/products/cctv/cameras/',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = await dbQuery.genericQuery('SELECT * FROM `info`; ');

			res.render('cameras', {
				breadcrumbs: req.breadcrumbs,
				data: data
			});
		} catch (e) {
			console.log(e);
		}
	}
);

// Marine Fixed & PTZ

router.get(
	'/products/cctv/cameras/fixed-marine-cameras',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};

			data = await dbQuery.genericQuery(
				'SELECT * FROM `info` WHERE category = "marine" AND movement = "FIXED" '
			);

			res.render('marine-cameras', {
				data: data,
				movement: 'Fixed',
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			consolee.log(error);
		}
	}
);

router.get(
	'/products/cctv/cameras/ptz-marine-cameras',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};

			data = await dbQuery.genericQuery(
				'SELECT * FROM `info` WHERE category = "marine" AND movement = "PTZ" '
			);

			res.render('marine-cameras', {
				data: data,
				movement: 'PTZ',
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			consolee.log(error);
		}
	}
);

router.get(
	'/products/cctv/cameras/fixed-hazardous-environment',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};

			data = await dbQuery.genericQuery(
				'SELECT * FROM `info` WHERE category = "hazardous" AND movement = "FIXED" '
			);

			res.render('hazardous-areas', {
				data: data,
				movement: 'Fixed',
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			consolee.log(error);
		}
	}
);

router.get(
	'/products/cctv/cameras/ptz-hazardous-environment',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};

			data = await dbQuery.genericQuery(
				'SELECT * FROM `info` WHERE category = "hazardous" AND movement = "PTZ" '
			);

			res.render('marine-cameras', {
				data: data,
				movement: 'PTZ',
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			consolee.log(error);
		}
	}
);

router.get(
	'/products/cctv/cameras/thermal-cameras',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = await dbQuery.genericQuery(
				'SELECT * FROM `info` WHERE (category = "thermal" OR addit_category = "thermal"); '
			);
			// res.send(data);
			// return;

			res.render('thermal-cameras', {
				breadcrumbs: req.breadcrumbs,
				data: data
			});
		} catch (e) {}
	}
);

router.get(
	'/products/cctv/cameras/commercial',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = await dbQuery.genericQuery(
				'SELECT * FROM `info` WHERE category = "commercial" '
			);
			// res.send(data);
			// return;
			res.render('cameras-commercial', {
				breadcrumbs: req.breadcrumbs,
				data: data
			});
		} catch (e) {}
	}
);

router.get(
	'/products/cctv/cameras/prison-cell',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('prison-cell', { breadcrumbs: req.breadcrumbs });
	}
);

// Camera Accessories

router.get(
	'/products/cctv/cctv-accessories',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = 'SELECT * FROM acc_info';
			data = await dbQuery.genericQuery(sqlQuery);
			// res.send(data);
			// return;
			res.render('cctv-accessories', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

// Camera Housing

router.get(
	'/products/cctv/camera-housings',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = 'SELECT * FROM `housings_info` ';
			data = await dbQuery.genericQuery(sqlQuery);

			res.render('camera-housings', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

// CCTV Recording

router.get(
	'/products/cctv/cctv-nvr',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = "SELECT * FROM nvr_info WHERE `monitor_type` != 'station' ";
			data = await dbQuery.genericQuery(sqlQuery);
			let diskInfo = await dbQuery.genericQuery(
				'SELECT `product_code`,`product_name`, `image`, `description` FROM `disk_nvr_info`'
			);
			let diskFeatures = await dbQuery.genericQuery(
				'SELECT * FROM `disk_nvr_features`'
			);
			let diskSizes = await dbQuery.genericQuery('SELECT * FROM `disk_nvr_sizes`');

			diskFeatures = controllers.removeFirst(diskFeatures);
			let constDeadVals = ['*', 'n/a', ''];
			let featureVals = Object.values(diskFeatures[0]);
			let newDiskFeaturesOnlyVals = featureVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			// res.send({
			// 	newDiskFeaturesOnlyVals,
			// 	diskInfo,
			// 	data
			// })
			// return

			res.render('cctv-recording', {
				diskFeatures: newDiskFeaturesOnlyVals,
				diskInfo: diskInfo,
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

// CCTV Storage

router.get(
	'/products/cctv/cctv-nvr-storage',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = 'SELECT * FROM disk_nvr_info';
			data = await dbQuery.genericQuery(sqlQuery);
			// res.send(data);
			// return;
			res.render('nvr-disk', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

// CCTV Monitors

router.get(
	'/products/cctv/cctv-monitors',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let specQuery = 'SELECT * FROM `monitors_specs` ';
			let typeQuery =
				'SELECT `monitor_type`, `type`, `image` FROM `monitors_types` ';
			let UHD = 'SELECT * FROM `monitors_specs` WHERE `type` = "UHD"; ';
			let fullHD = 'SELECT * FROM `monitors_specs` WHERE `type` = "Full HD"; ';
			let HD = 'SELECT * FROM `monitors_specs` WHERE `type` = "HD"; ';
			let UHDF = 'SELECT * FROM `monitors_types` WHERE `type` = "UHD"; ';
			let FHDF = 'SELECT * FROM `monitors_types` WHERE `type` = "FHD"; ';
			let HDF = 'SELECT * FROM `monitors_types` WHERE `type` = "HD"; ';
			let specs = await dbQuery.genericQuery(specQuery);
			let types = await dbQuery.genericQuery(typeQuery);
			let UHDMonitors = await dbQuery.genericQuery(UHD);
			let fullHDMonitors = await dbQuery.genericQuery(fullHD);
			let HDMonitors = await dbQuery.genericQuery(HD);
			let UHDFeat = await dbQuery.genericQuery(UHDF);
			let FHDFeat = await dbQuery.genericQuery(FHDF);
			let HDFeat = await dbQuery.genericQuery(HDF);

			UHDFeat = Object.values(UHDFeat[0]);
			FHDFeat = Object.values(FHDFeat[0]);
			HDFeat = Object.values(HDFeat[0]);

			let dead = UHDFeat.shift();
			dead = FHDFeat.shift();
			dead = HDFeat.shift();

			let UHDSpecs = Object.values(UHDMonitors[0]);
			let FHDSpecs = Object.values(fullHDMonitors[0]);
			let HDSpecs = Object.values(HDMonitors[0]);
			let pop = UHDFeat.pop();
			pop = FHDFeat.pop();
			pop = HDFeat.pop();

			res.render('cctv-monitors', {
				specs: specs,
				types: types,
				UHD: UHDMonitors,
				FHD: fullHDMonitors,
				HD: HDMonitors,
				UHDSpecs: UHDSpecs,
				FHDSpecs: FHDSpecs,
				HDSpecs: HDSpecs,
				UHDF: UHDFeat,
				FHDF: FHDFeat,
				HDF: HDFeat,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

// CCTV Transmission

router.get(
	'/products/cctv/cctv-transmission',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let ethData = {};
			let cableData = {};
			ethData = await dbQuery.genericQuery('SELECT * FROM eth_info');
			cableData = await dbQuery.genericQuery('SELECT * FROM cables_all');

			res.render('cctv-transmission', {
				ethData: ethData,
				cableData: cableData,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

router.get(
	'/products/cctv/marine-grade-cables',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let data = {};
			let sqlQuery = 'SELECT * FROM nvr_disk_info';
			data = await dbQuery.genericQuery(sqlQuery);
			// res.send(data);
			// return;
			res.render('nvr-disk', {
				data: data,
				breadcrumbs: req.breadcrumbs
			});
		} catch (error) {
			console.log(error);
		}
	}
);

// CCTV Ancillary

router.get(
	'/products/cctv/cctv-ancillaries',
	breadcrumbs.Middleware(),
	async (req, res) => {
		res.render('cctv-ancillaries', {
			breadcrumbs: req.breadcrumbs
		});
	}
);

// Security Management Software

router.get(
	'/products/cctv/security-management-software',
	breadcrumbs.Middleware(),
	(req, res) => {
		res.render('management-software', { breadcrumbs: req.breadcrumbs });
	}
);

// Product Page Routes

// CCTV accessories prod page

router.get(
	'/products/cctv/cctv-accessories/:product_code',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let info = await dbQuery.getData(
				'SELECT * FROM `acc_info` WHERE product_code = ?',
				[req.params.product_code]
			);
			let physical = await dbQuery.getData(
				'SELECT * FROM `acc_physical` WHERE product_code = ?',
				[req.params.product_code]
			);
			let certs = await dbQuery.getData(
				'SELECT * FROM `acc_certs` WHERE product_code = ?',
				[req.params.product_code]
			);
			let power = await dbQuery.getData(
				'SELECT * FROM `acc_power` WHERE product_code = ?',
				[req.params.product_code]
			);

			let features = await dbQuery.getData(
				'SELECT ' +
					'`feature_1`, ' +
					'`feature_2`, ' +
					'`feature_3`, ' +
					'`feature_4`, ' +
					'`feature_5`, ' +
					'`feature_6`, ' +
					'`feature_7`, ' +
					'`feature_8`, ' +
					'`feature_9`, ' +
					'`feature_10`, ' +
					'`feature_11`, ' +
					'`feature_12`, ' +
					'`feature_13`, ' +
					'`feature_14`, ' +
					'`feature_15`, ' +
					'`feature_16` FROM `acc_info` WHERE product_code = ? ;',
				[req.params.product_code]
			);

			let constDeadVals = ['*', 'n/a', ''];

			featuresArray = Object.values(features[0]);

			featuresArray = featuresArray.filter(function (val) {
				return constDeadVals.indexOf(val) == -1;
			});

			info = controllers.removeFirst(info);
			physical = controllers.removeFirst(physical);
			certs = controllers.removeFirst(certs);
			power = controllers.removeFirst(power);

			physical = physical[0];
			certs = certs[0];
			power = power[0];

			let allPhysKeys = controllers.listAllKeys(physical);
			let allCertsKeys = controllers.listAllKeys(certs);
			let allPowerKeys = controllers.listAllKeys(power);

			let deadPhysKeys = controllers.filterDead(physical);
			let deadCertsKeys = controllers.filterDead(certs);
			let deadPowerKeys = controllers.filterDead(power);

			let allPhysVals = controllers.listAllVals(physical);
			let allCertsVals = controllers.listAllVals(certs);
			let allPowerVals = controllers.listAllVals(power);

			let newPhysKeys = allPhysKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPhysKeys.length; i++) {
					if (value === deadPhysKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newCertsKeys = allCertsKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadCertsKeys.length; i++) {
					if (value === deadCertsKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPowerKeys = allPowerKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPowerKeys.length; i++) {
					if (value === deadPowerKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPhysVals = allPhysVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newCertsVals = allCertsVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPowerVals = allPowerVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let finalPhys = Object.fromEntries(
				newPhysKeys.map((a, i) => [a, newPhysVals[i]])
			);

			let finalCerts = Object.fromEntries(
				newCertsKeys.map((a, i) => [a, newCertsVals[i]])
			);

			let finalPower = Object.fromEntries(
				newPowerKeys.map((a, i) => [a, newPowerVals[i]])
			);

			res.render('product-pages/cctv-accessories', {
				breadcrumbs: req.breadcrumbs,
				info: info[0],
				features: featuresArray,
				physical: finalPhys,
				power: power,
				certs: finalCerts
			});
		} catch (e) {
			console.log(e);
		}
	}
);

// transmission-prod-page

router.get(
	'/products/cctv/cctv-transmission/:product_code',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let info = await dbQuery.getData(
				'SELECT * FROM `eth_info` WHERE product_code = ?',
				[req.params.product_code]
			);
			let features = await dbQuery.getData(
				'SELECT * FROM `ethernet_features` WHERE product_code = ?',
				[req.params.product_code]
			);
			let interface = await dbQuery.getData(
				'SELECT * FROM `ethernet_interface` WHERE product_code = ?',
				[req.params.product_code]
			);
			let eth_interface = await dbQuery.getData(
				'SELECT * FROM `ethernet_eth_interface` WHERE product_code = ?',
				[req.params.product_code]
			);
			let led = await dbQuery.getData(
				'SELECT * FROM `ethernet_led` WHERE product_code = ?',
				[req.params.product_code]
			);
			let onboard = await dbQuery.getData(
				'SELECT * FROM `ethernet_onboard` WHERE product_code = ?',
				[req.params.product_code]
			);
			let physical = await dbQuery.getData(
				'SELECT * FROM `ethernet_physical` WHERE product_code = ?',
				[req.params.product_code]
			);
			let power = await dbQuery.getData(
				'SELECT * FROM `ethernet_power` WHERE product_code = ?',
				[req.params.product_code]
			);

			// features = features[0];
			interface = interface[0];
			eth_interface = eth_interface[0];
			led = led[0];
			onboard = onboard[0];
			physical = physical[0];
			power = power[0];

			let noConcat = controllers.removeProp(features, `features_concat`);

			noConcat = controllers.removeFirst(noConcat);
			// res.send(noConcat);
			// return;
			interface = controllers.noCode(interface);
			eth_interface = controllers.noCode(eth_interface);
			led = controllers.noCode(led);
			onboard = controllers.noCode(onboard);
			physical = controllers.noCode(physical);
			power = controllers.noCode(power);

			// res.send(noConcat);

			noConcat = noConcat[0];

			// keys

			let allFeatureKeys = controllers.listAllKeys(noConcat);
			let allInterfaceKeys = controllers.listAllKeys(interface);
			let allEthInterfaceKeys = controllers.listAllKeys(eth_interface);
			let allLedKeys = controllers.listAllKeys(led);
			let allOnboardKeys = controllers.listAllKeys(onboard);
			let allPhysicalKeys = controllers.listAllKeys(physical);
			let allPowerKeys = controllers.listAllKeys(power);

			// dead keys

			let deadFeaturekeys = controllers.filterDead(noConcat);
			let deadInterfaceK = controllers.filterDead(interface);
			let deadEthInterfaceK = controllers.filterDead(eth_interface);
			let deadLedKeys = controllers.filterDead(led);
			let deadOnboardKeys = controllers.filterDead(onboard);
			let deadPhysicalKeys = controllers.filterDead(physical);
			let deadPowerKeys = controllers.filterDead(power);

			// new keys

			let newFeaturesOnlyKeys = allFeatureKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadFeaturekeys.length; i++) {
					if (value === deadFeaturekeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newInterfaceKeys = allInterfaceKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadInterfaceK.length; i++) {
					if (value === deadInterfaceK[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newEthKeys = allEthInterfaceKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadEthInterfaceK.length; i++) {
					if (value === deadEthInterfaceK[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newLedKeys = allLedKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadLedKeys.length; i++) {
					if (value === deadLedKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newOBKeys = allOnboardKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadOnboardKeys.length; i++) {
					if (value === deadOnboardKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPhysKeys = allPhysicalKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPhysicalKeys.length; i++) {
					if (value === deadPhysicalKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPowerKeys = allPowerKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPowerKeys.length; i++) {
					if (value === deadPowerKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let allFeatureVals = controllers.listAllVals(noConcat);
			let allInterfaceVals = controllers.listAllVals(interface);
			let allIntEthVals = controllers.listAllVals(eth_interface);
			let allLedVals = controllers.listAllVals(led);
			let allOBVals = controllers.listAllVals(onboard);
			let allPowerVals = controllers.listAllVals(power);
			let allPhysVals = controllers.listAllVals(physical);
			let constDeadVals = ['*', 'n/a', ''];

			let newFeaturesOnlyVals = allFeatureVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			// res.send(newFeaturesOnlyVals);
			// return

			let newIntVals = allInterfaceVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newEthIntVals = allIntEthVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newLedVals = allLedVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newOBVals = allOBVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPhysVals = allPhysVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPowerVals = allPowerVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let finalInterface = Object.fromEntries(
				newInterfaceKeys.map((a, i) => [a, newIntVals[i]])
			);

			let finalEthInt = Object.fromEntries(
				newEthKeys.map((a, i) => [a, newEthIntVals[i]])
			);

			let finalLED = Object.fromEntries(
				newLedKeys.map((a, i) => [a, newLedVals[i]])
			);

			let finalOB = Object.fromEntries(newOBKeys.map((a, i) => [a, newOBVals[i]]));

			let finalPhys = Object.fromEntries(
				newPhysKeys.map((a, i) => [a, newPhysVals[i]])
			);
			let finalPower = Object.fromEntries(
				newPowerKeys.map((a, i) => [a, newPowerVals[i]])
			);

			let finalObj = {};

			info = info[0];

			finalObj.info = info;
			finalObj.features = newFeaturesOnlyVals;
			finalObj.interface = finalInterface;
			finalObj.ethInt = finalEthInt;
			finalObj.LED = finalLED;
			finalObj.OB = finalOB;
			finalObj.physical = finalPhys;
			finalObj.power = finalPower;

			res.render('product-pages/ethernet-product-page', {
				data: finalObj,
				info: info,
				features: newFeaturesOnlyVals,
				interface: finalInterface,
				ethInt: finalEthInt,
				OB: finalOB,
				LED: finalLED,
				phys: finalPhys,
				power: finalPower,
				breadcrumbs: req.breadcrumbs
			});
		} catch (e) {
			console.log(e);
			return res.render('index');
		}
	}
);

// marine-grade-cable

router.get(
	'/products/cctv/marine-grade-cable/:product_code',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let info = await dbQuery.getData(
				'SELECT `product_code`, `product_name`, `description` FROM `cables_all` WHERE `product_code` = ? ',
				[req.params.product_code]
			);

			let featureQuery =
				'SELECT feature_1, feature_2, feature_3, feature_4 ' +
				'feature_5, feature_6, feature_7, feature_8, feature_9 ' +
				'feature_10, feature_11, feature_12, feature_13, feature_14, feature_15, feature_16 ' +
				'FROM `cables_all` WHERE `product_code` = ? ;';

			let features = await dbQuery.getData(featureQuery, [req.params.product_code]);

			info = info[0];

			let constDeadVals = ['*', 'n/a', ''];

			let featureVals = Object.values(features[0]);

			let newFeaturesOnlyVals = featureVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			// res.send(features);
			res.render('product-pages/marine-cables', {
				breadcrumbs: req.breadcrumbs,
				features: newFeaturesOnlyVals,
				info: info
			});
			return;
		} catch (e) {
			console.log(e);
		}
	}
);

// nvr-prod-page

router.get(
	'/products/cctv/cctv-nvr/:product_code',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			// Return array of tables starting with 'nvr_'
			let allTables = await dbQuery.getData(
				'SELECT table_name ' +
					'FROM information_schema.tables ' +
					"WHERE table_type= 'BASE TABLE' " +
					"AND table_name LIKE 'nvr_%' " +
					"AND table_schema = 'osprey-all' ;"
			);
			// Query nvr info
			let info = await dbQuery.getData(
				'SELECT * FROM `nvr_info` WHERE `product_code` = ? ;',
				[req.params.product_code]
			);

			info = info[0];

			// Query nvr features
			let features = await dbQuery.getData(
				'SELECT * FROM features_nvr WHERE product_code = ?',
				[req.params.product_code]
			);

			// Remove the concat and the prod_code from the object
			features = controllers.removeProp(features, 'features_concat');
			features = controllers.removeFirst(features);

			let constDeadVals = ['*', 'n/a', ''];
			let featureVals = Object.values(features[0]);

			// Filter out only good values for the final feature array
			let newFeaturesOnlyVals = featureVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			// Perform the search query on all tables retrieved earlier
			let tableArr = [];

			allTables.forEach(tableObj => {
				tableArr.push(Object.values(tableObj));
			});

			let flat = tableArr.flat();

			var mappedData = {};
			for (let i = 0; i < flat.length; i++) {
				let table = flat[i];
				mappedData[flat[i]] = await dbQuery.getData(
					`SELECT * FROM \`${table}\` WHERE \`product_code\` = ? `,
					[req.params.product_code]
				);
			}

			// create array of arrays of objects from the tables queried in the loop
			let newData = Object.entries(mappedData);

			let adv_features = newData[0][1][0];
			let adv_features_1 = newData[1][1][0];
			let audio = newData[2][1][0];
			let deep_search = newData[3][1][0];
			let device = newData[4][1][0];
			let display = newData[5][1][0];
			let general = newData[6][1][0];
			let interface = newData[8][1][0];
			let network = newData[9][1][0];
			let playback = newData[10][1][0];
			let recording = newData[11][1][0];
			let remote = newData[12][1][0];
			let storage = newData[13][1][0];
			let system = newData[14][1][0];
			let video = newData[15][1][0];

			let temp = [
				adv_features,
				adv_features_1,
				audio,
				deep_search,
				device,
				display,
				general,
				interface,
				network,
				playback,
				recording,
				remote,
				storage,
				system,
				video
			];

			// info = info[0];

			temp.forEach(element => {
				controllers.noCode(element);
			});

			res.render('product-pages/nvr', {
				adv_features: temp[0],
				adv_features_1: temp[1],
				audio: temp[2],
				deep_search: temp[3],
				device: temp[4],
				display: temp[5],
				general: temp[6],
				interface: temp[7],

				network: temp[8],
				playback: temp[9],
				recording: temp[0],
				remote: temp[11],
				system: temp[12],
				video: temp[13],
				info: info,
				features: newFeaturesOnlyVals,
				breadcrumbs: req.breadcrumbs
			});
		} catch (e) {
			console.log(e);
		}
	}
);

// camera-housings-prod-page

router.get(
	'/products/cctv/camera-housings/:product_code',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let info = await dbQuery.getData(
				'SELECT * FROM `housings_info` WHERE `product_code` = ?',
				[req.params.product_code]
			);

			let features = await dbQuery.getData(
				'SELECT * FROM `housings_features` WHERE `product_code` = ?',
				[req.params.product_code]
			);

			let movement = await dbQuery.getData(
				'SELECT * FROM `housings_movement` WHERE `product_code` = ?',
				[req.params.product_code]
			);

			let optics = await dbQuery.getData(
				'SELECT * FROM `housings_optics` WHERE `product_code` = ?',
				[req.params.product_code]
			);

			let physical = await dbQuery.getData(
				'SELECT * FROM `housings_physical` WHERE `product_code` = ?',
				[req.params.product_code]
			);

			let power = await dbQuery.getData(
				'SELECT * FROM `housings_power` WHERE `product_code` = ?',
				[req.params.product_code]
			);

			let certs = await dbQuery.getData(
				'SELECT * FROM `housings_certs` WHERE `product_code` = ?',
				[req.params.product_code]
			);

			// remove dead values from features and return only values in new array
			let constDeadVals = ['*', 'n/a', ''];

			let featuresArray = Object.values(features[0]);

			featuresArray = featuresArray.filter(function (val) {
				return constDeadVals.indexOf(val) == -1;
			});

			movement = controllers.removeFirst(movement);
			optics = controllers.removeFirst(optics);
			physical = controllers.removeFirst(physical);
			power = controllers.removeFirst(power);
			certs = controllers.removeFirst(certs);

			movement = movement[0];
			optics = optics[0];
			physical = physical[0];
			power = power[0];
			certs = certs[0];

			let allMovementKeys = controllers.listAllKeys(movement);
			let allOpticsKeys = controllers.listAllKeys(optics);
			let allPhysicalKeys = controllers.listAllKeys(physical);
			let allPowerKeys = controllers.listAllKeys(power);
			let allCertsKeys = controllers.listAllKeys(certs);

			let deadMovementKeys = controllers.filterDead(movement);
			let deadOpticsKeys = controllers.filterDead(optics);
			let deadPhysicalKeys = controllers.filterDead(physical);
			let deadPowerKeys = controllers.filterDead(power);
			let deadCertsKeys = controllers.filterDead(certs);

			let newMovementKeys = allMovementKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadMovementKeys.length; i++) {
					if (value === deadMovementKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newOpticsKeys = allOpticsKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadOpticsKeys.length; i++) {
					if (value === deadOpticsKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPhysKeys = allPhysicalKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPhysicalKeys.length; i++) {
					if (value === deadPhysicalKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPowerKeys = allPowerKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPowerKeys.length; i++) {
					if (value === deadPowerKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newCertsKeys = allCertsKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadCertsKeys.length; i++) {
					if (value === deadCertsKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			// vals

			let allMovementVals = controllers.listAllVals(movement);
			let allOpticsVals = controllers.listAllVals(optics);
			let allPhysVals = controllers.listAllVals(physical);
			let allPowerVals = controllers.listAllVals(power);
			let allCertsVals = controllers.listAllVals(certs);

			let newMovementVals = allMovementVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newOpticsVals = allOpticsVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPhysVals = allPhysVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newPowerVals = allPowerVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newCertsVals = allCertsVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let finalMovement = Object.fromEntries(
				newMovementKeys.map((a, i) => [a, newMovementVals[i]])
			);
			let finalOptics = Object.fromEntries(
				newOpticsKeys.map((a, i) => [a, newOpticsVals[i]])
			);
			let finalPhys = Object.fromEntries(
				newPhysKeys.map((a, i) => [a, newPhysVals[i]])
			);
			let finalPower = Object.fromEntries(
				newPowerKeys.map((a, i) => [a, newPowerVals[i]])
			);
			let finalCerts = Object.fromEntries(
				newCertsKeys.map((a, i) => [a, newCertsVals[i]])
			);

			info = info[0];

			res.render('product-pages/camera-housings', {
				breadcrumbs: req.breadcrumbs,
				info: info,
				features: featuresArray,
				movement: finalMovement,
				optics: finalOptics,
				phys: finalPhys,
				power: finalPower,
				certs: finalCerts
			});
		} catch (e) {
			console.error(e);
		}
	}
);

// cctv-cameras-prod-page

router.get(
	'/products/cctv/cameras/:product_code',
	breadcrumbs.Middleware(),
	async (req, res) => {
		try {
			let camInfo = await dbQuery.getAllInfo(req);
			let movement = await dbQuery.getMovement(req);
			let camFeaturesConcat = await dbQuery.getConcatFeatures(req);
			let allFeatures = await dbQuery.getAllFeatures(req);
			let audioVideo = await dbQuery.getAV(req);
			let physical = await dbQuery.getPhysical(req);
			let power = await dbQuery.getPower(req);
			let certs = await dbQuery.getCerts(req);

			camInfo = camInfo[0];
			movement = movement[0];
			camFeatures = allFeatures[0];
			camFeaturesConcat = camFeaturesConcat[0];
			audioVideo = audioVideo[0];
			physical = physical[0];
			power = power[0];
			certs = certs[0];

			allFeatures = controllers.removeFirst(allFeatures);
			movement = controllers.removeProductCode(movement);
			physical = controllers.removeProductCode(physical);
			audioVideo = controllers.removeProductCode(audioVideo);
			power = controllers.removeProductCode(power);
			certs = controllers.removeProductCode(certs);

			noConcat = controllers.removeProp(allFeatures, `features_concat`);
			noConcat = noConcat[0];

			let allInfoKeys = controllers.listAllKeys(camInfo);
			let allMovementKeys = controllers.listAllKeys(movement);
			let allFeatureKeys = controllers.listAllKeys(noConcat);
			let allAvKeys = controllers.listAllKeys(audioVideo);
			let allPhysKeys = controllers.listAllKeys(physical);
			let allPowerKeys = controllers.listAllKeys(power);
			let allCertsKeys = controllers.listAllKeys(certs);

			let deadInfoKeys = controllers.filterDead(camInfo);
			let deadMovementKeys = controllers.filterDead(movement);
			let deadFeaturekeys = controllers.filterDead(noConcat);
			let deadAvKeys = controllers.filterDead(audioVideo);
			let deadPhysicalKeys = controllers.filterDead(physical);
			let deadPowerKeys = controllers.filterDead(power);
			let deadCertsKeys = controllers.filterDead(certs);

			let allInfoVals = controllers.listAllVals(camInfo);
			let allMovementVals = controllers.listAllVals(movement);
			let allFeaturesVals = controllers.listAllVals(noConcat);
			let allAvVals = controllers.listAllVals(audioVideo);
			let allPhysVals = controllers.listAllVals(physical);
			let allPowerVals = controllers.listAllVals(power);
			let allCertsVals = controllers.listAllVals(certs);

			let newInfoKeys = [];
			let newMovementKeys = [];
			let newFeaturesOnlyKeys = [];
			let newAvKeys = [];
			let newPhysKeys = [];
			let newPowerKeys = [];
			let newCertsKeys = [];

			newInfoKeys = allInfoKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadInfoKeys.length; i++) {
					if (value === deadInfoKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newMovementKeys = allMovementKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadMovementKeys.length; i++) {
					if (value === deadMovementKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newFeaturesOnlyKeys = allFeatureKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadFeaturekeys.length; i++) {
					if (value === deadFeaturekeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newAvKeys = allAvKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadAvKeys.length; i++) {
					if (value === deadAvKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newPhysKeys = allPhysKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPhysicalKeys.length; i++) {
					if (value === deadPhysicalKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newPowerKeys = allPowerKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadPowerKeys.length; i++) {
					if (value === deadPowerKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newCertsKeys = allCertsKeys.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < deadCertsKeys.length; i++) {
					if (value === deadCertsKeys[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let newInfoVals = [];
			let newMovementVals = [];
			let newFeaturesOnlyVals = [];
			let newAvVals = [];
			let newPhysVals = [];
			let newPowerVals = [];
			let newCertsVals = [];
			let constDeadVals = ['*', 'n/a', ''];

			newInfoVals = allInfoVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newMovementVals = allMovementVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newFeaturesOnlyVals = allFeaturesVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newAvVals = allAvVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newPhysVals = allPhysVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newPowerVals = allPowerVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			newCertsVals = allCertsVals.reduce(function (prev, value) {
				var isDuplicate = false;
				for (var i = 0; i < constDeadVals.length; i++) {
					if (value === constDeadVals[i]) {
						isDuplicate = true;
						break;
					}
				}
				if (!isDuplicate) {
					prev.push(value);
				}
				return prev;
			}, []);

			let finalInfo = {};
			let finalMovement = {};
			let finalFeatures = {};
			let finalAV = {};
			let finalPhys = {};
			let finalPower = {};
			let finalCerts = {};

			finalInfo = Object.fromEntries(
				newInfoKeys.map((a, i) => [a, newInfoVals[i]])
			);

			finalMovement = Object.fromEntries(
				newMovementKeys.map((a, i) => [a, newMovementVals[i]])
			);

			finalFeatures = Object.fromEntries(
				newFeaturesOnlyKeys.map((a, i) => [a, newFeaturesOnlyVals[i]])
			);

			finalAV = Object.fromEntries(newAvKeys.map((a, i) => [a, newAvVals[i]]));

			finalPhys = Object.fromEntries(
				newPhysKeys.map((a, i) => [a, newPhysVals[i]])
			);

			finalPower = Object.fromEntries(
				newPowerKeys.map((a, i) => [a, newPowerVals[i]])
			);

			finalCerts = Object.fromEntries(
				newCertsKeys.map((a, i) => [a, newCertsVals[i]])
			);

			let featuresArray = [];
			let movementArray = [];
			let avArray = [];
			let physArray = [];
			let powerArray = [];
			let certsArray = [];

			Object.values(finalFeatures).forEach(val => {
				featuresArray.push(val);
			});
			Object.values(finalMovement).forEach(val => {
				movementArray.push(val);
			});
			Object.values(finalAV).forEach(val => {
				avArray.push(val);
			});
			Object.values(finalPhys).forEach(val => {
				physArray.push(val);
			});

			Object.values(finalPower).forEach(val => {
				powerArray.push(val);
			});

			Object.values(finalCerts).forEach(val => {
				certsArray.push(val);
			});

			function isArrayEmpty(array) {
				let constError = 'No Data Available';
				if (array.length < 1) {
					array.push(constError);
				} else {
					array = array;
				}
			}

			let finalObj = {};

			finalObj.info = finalInfo;
			finalObj.movement = finalMovement;
			finalObj.features = finalFeatures;
			finalObj.AV = finalAV;
			finalObj.physical = finalPhys;
			finalObj.power = finalPower;
			finalObj.certs = finalCerts;

			res.render('product-pages/main-prod-page', {
				data: finalObj,
				av: finalAV,
				movement: finalMovement,
				physical: finalPhys,
				power: finalPower,
				certs: finalCerts,
				features: featuresArray,
				info: finalInfo,
				breadcrumbs: req.breadcrumbs
			});
		} catch (e) {
			console.error(e);
			// return res.render('index');
		}
	}
);

module.exports = router;
