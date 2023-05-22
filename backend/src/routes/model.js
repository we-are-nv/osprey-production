//Import Packages
const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;

// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');

//Import Model Files
const allProducts = require('../models/product_info.js');
const categories = require('../models/categories.js');
const productModels = require('../models/product_models.js');
const blockList = require('../models/block_list.js');

const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.get('/get_model_structure', async (req, res) => {
	// Default Values
	const {
		selectedModel = 'camera',
		category = '646896611b216e6dcc0da06a',
		showTypes = 'true',
		showUnused = 'true'
	} = req.query;

	if (!category) {
		res.json({ errorNumber: 41, errorMessage: 'Category Not Declared' });
		return;
	}

	const model = await productModels.findOne({ type_name: selectedModel });
	const blockRaw = await blockList.findOne({ category: category });
	var blockArray = blockRaw._doc.data;
	var returnArray = new Array();
	var keys = Object.keys(model._doc.data);
	var usedFieldsArr = [];
	var unusedFieldsArr = [];
	for (idx in keys) {
		var relBlock = blockArray.filter(obj => {
			return obj.type_name === keys[idx];
		});
		//console.log(keys[1])
		var relBlockKeys = Object.keys(relBlock[0].data);
		var intersection = relBlockKeys.filter(
			x => !model._doc.data[keys[idx]].includes(x)
		);

		if (showTypes == 'true') {
			for (usedIdx in model._doc.data[keys[idx]]) {
				var pushObj = {
					name: model._doc.data[keys[idx]][usedIdx],
					type: relBlock[0].data[model._doc.data[keys[idx]][usedIdx]].type
				};
				usedFieldsArr.push(pushObj);
			}
			for (unUsedIdx in intersection) {
				var pushUnObj = {
					name: intersection[unUsedIdx],
					type: relBlock[0].data[intersection[unUsedIdx]].type
				};
				unusedFieldsArr.push(pushUnObj);
			}
		} else {
			usedFieldsArr = model._doc.data[keys[idx]];
			unusedFieldsArr = intersection;
		}

		var obj = {
			block_name: keys[1],
			usedFields: usedFieldsArr
		};
		if (showUnused == 'true') {
			obj['unusedFields'] = unusedFieldsArr;
		}
		returnArray.push(obj);
	}
	res.json({ modelData: returnArray });
});

router.get('/get_blocks', async (req, res) => {
	if (!req.query.category) {
		res.json({ errorNumber: 41, errorMessage: 'Category Not Declared' });
		return;
	}
	const blocks = await blockList.findOne({ category: req.query.category });
	res.json({ blocks: blocks.data });
});

router.get('/get_models', async (req, res) => {
	if (!req.query.category) {
		res.json({ errorNumber: 41, errorMessage: 'Category Not Declared' });
		return;
	}
	const models = await productModels.find({ category: req.query.category });
	var modelList = [];
	for (idx in models) {
		modelList.push(models[idx].type_name);
	}
	res.json({ models_available: modelList });
});

router.post('/paragon/block', async (req, res) => {
	if (!req.query.category) {
		res.json({ errorNumber: 41, errorMessage: 'Category Not Declared' });
		return;
	}
	const selectedBlock = await blockList.findOne({ category: req.query.category });
	if (!selectedBlock) {
		console.log('Block List does not exist');
	} else {
		var existingData = selectedBlock.data;
		if (!Array.isArray(req.body.blocks)) {
			res.json({ errorNumber: 42, errorMessage: 'Body is Not Array!' });
			return;
		}
		var existingKeys = [];
		for (existIdx in existingData) {
			existingKeys.push(existingData[existIdx].type_name);
		}

		for (idx in req.body.blocks) {
			if (existingKeys.includes(req.body.blocks[idx].type_name)) {
				res.json({
					errorNumber: 43,
					errorMessage:
						'Type Name: ' + req.body.blocks[idx].type_name + ' is not Unique!'
				});
				return;
			}
		}
		var newData = [...req.body.blocks, ...existingData];
		blockList
			.findOneAndUpdate(
				{ category: req.query.category },
				{ data: newData },
				{ upsert: true }
			)
			.then(result => {
				res.json({ message: 'Added Block', blocks: req.body.blocks });
			});
	}
});

router.delete('/paragon/block', async (req, res) => {
	if (!req.query.category) {
		res.json({ errorNumber: 41, errorMessage: 'Category Not Declared' });
		return;
	}
	if (!req.query.block) {
		res.json({ errorNumber: 44, errorMessage: 'Block Not Declared' });
		return;
	}
	const selectedBlock = await blockList.findOne({ category: req.query.category });
	var existingData = selectedBlock.data;
	var newData = new Array();
	for (idx in existingData) {
		if (existingData[idx].type_name != req.query.block) {
			newData.push(existingData[idx]);
		}
	}
	blockList
		.findOneAndUpdate(
			{ category: req.query.category },
			{ data: newData },
			{ upsert: true }
		)
		.then(result => {
			res.json({ message: 'Deleted Block', block: req.query.block });
		});
});

router.post('/paragon/model', async (req, res) => {
	const { force = 'false' } = req.query;

	if (!req.query.category) {
		res.json({ errorNumber: 41, errorMessage: 'Category Not Declared' });
		return;
	}
	const selectedBlock = await blockList.findOne({ category: req.query.category });
	var blockData = selectedBlock.data;
	var dataKeys = Object.keys(req.body.data);
	for (idx in dataKeys) {
		var relBlock = Object.keys(
			blockData.filter(obj => {
				return obj.type_name === dataKeys[idx];
			})[0].data
		);
		var modelBlock = req.body.data[dataKeys[idx]];
		var excludedValues = relBlock.filter(x => !modelBlock.includes(x));
		var newValues = modelBlock.filter(x => !relBlock.includes(x));
		if (force == 'false' && newValues.length > 0) {
			res.json({
				errorNumber: 51,
				errorMessage: 'Undeclared Values are not permitted!',
				undecalredValue: newValues
			});
			return;
		}

		console.log(newValues);
	}
	var newModel = new productModels({
		data: req.body.data,
		type_name: req.body.name,
		category: req.query.category
	});
	newModel.save();
	res.json({ message: 'Added Model', model: newModel });
});
module.exports = router;
