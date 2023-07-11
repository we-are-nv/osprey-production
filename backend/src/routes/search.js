const express = require('express');
const mongoose = require('mongoose');
const product_info = require('../models/product_info');
require('dotenv').config();

const router = express.Router();

router.use(function timelog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.get('/', async (req, res) => {
	const searchQuery = req.query.query;
	const collectionNames = ['product_info', 'category', 'info', 'info-pages'];
	try {
		const searchResults = {};

		for (const collectionName of collectionNames) {
			const collectionModel = mongoose.model(collectionName);

			let fieldName;
			let results;
			let include = {};
			let exclude = {};

			if (collectionName === 'product_info') {
				fieldName = 'product_name';
				include = {
					product_name: 1,
					product_code: 1,
					image: 1
				};
				exclude = {
					technicalImages: 0,
					description: 0,
					features: 0,
					manufacturer: 0,
					cost: 0,
					productType: 0,
					category: 0,
					additional_information: 0
				};
			}
			if (collectionName === 'category') {
				fieldName = 'name';
				exclude = {
					_id: 0,
					'info.heading': 0,
					'info.subheading': 0
					// 'parent': 0
				};
			}
			if (collectionName === 'info') {
				fieldName = 'name';
				include = {
					name: 1,
					thumbnail_image: 1
				};
			}
			if (collectionName === 'info-pages') {
				fieldName = 'name';
				include = {
					name: 1,
					elements: 1
				};
			}
			results = await collectionModel.find(
				{
					[fieldName]: { $regex: searchQuery, $options: 'i' }
				},
				include ? include : exclude
			);
			searchResults[collectionName] = results;
		}

		res.status(200).json({
			message: 'Success',
			results: searchResults
		});
	} catch (err) {
		console.error('Error searching collections', err);
		res.status(500).json({ message: 'Internal Server Error', err });
	}
});

module.exports = router;
