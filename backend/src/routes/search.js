const express = require('express');
const mongoose = require('mongoose');
const product_info = require('../models/product_info');

const allProducts = require('../models/product_info.js');
const categories = require('../models/categories.js');
const productModels = require('../models/product_models.js');
const blockList = require('../models/block_list.js');
const informationPage = require('../models/information-page');
const information = require('../models/information');
require('dotenv').config();

const router = express.Router();

router.use(function timelog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// router.get('/', async (req, res) => {
// 	const searchQuery = req.query.query;
// 	const collectionNames = ['product_info', 'category', 'info', 'info-pages'];
// 	try {
// 		const searchResults = {};

// 		for (const collectionName of collectionNames) {
// 			const collectionModel = mongoose.model(collectionName);
// 			// // let results;
// 			// if (collectionName === 'product_models' || 'category' || ) {
// 			// 	fieldName = 'name'
// 			// } else if (collectionName === 'info') {
// 			// 	fieldName === 'name'
// 			// }

// 			let fieldName;
// 			let results;
// 			let include = {};
// 			let exclude = {};

// 			if (collectionName === 'product_info') {
// 				fieldName = 'product_name';
// 				include = {
// 					product_name: 1,
// 					product_code: 1,
// 					image: 1
// 				};
// 				exclude = {
// 					technicalImages: 0,
// 					description: 0,
// 					features: 0,
// 					manufacturer: 0,
// 					cost: 0,
// 					productType: 0,
// 					category: 0,
// 					additional_information: 0
// 				};
// 			}
// 			if (collectionName === 'category') {
// 				fieldName = 'name';
// 				exclude = {
// 					_id: 0,
// 					'info.heading': 0,
// 					'info.subheading': 0
// 				};
// 			}
// 			if (collectionName === 'info') {
// 				fieldName = 'name';
// 				include = {
// 					name: 1,
// 					thumbnail_image: 1
// 				};
// 			}
// 			if (collectionName === 'info-pages') {
// 				fieldName = 'name';
// 				include = {
// 					name: 1,
// 					elements: 1
// 				};
// 			}
// 			results = await product_info.find(
// 				{
// 					[fieldName]: { $regex: searchQuery, $options: 'i' }
// 				},
// 				include ? include : exclude
// 			);
// 			searchResults[collectionName] = results;
// 		}

// 		res.status(200).json({
// 			message: 'Success',
// 			results: searchResults
// 		});
// 	} catch (err) {
// 		console.error('Error searching collections', err);
// 		res.status(500).json({ message: 'Internal Server Error', err });
// 	}
// });

const dbSearch = {
  "product": allProducts,
  "page": informationPage,
  "info": information,
  "category": categories
};

const dbSelect = {

  "product": {
    standard: 'product_name product_code ',
    extra: 'image description'
  },
  "page": {
    standard: "name ",
    extra: "elements"
  },
  "info": {
    standard: "name type ",
    extra: "banner_image thumbnail_image bonus_cards pages"
  },
  "category": {
    standard: "name image ",
    extra: "info"
  }
}

router.get('/', async (req, res) => {
  // Declare Default Values
  const {
    page = 1,
    searchDB = 'product',
    limit = 10,
    searchFor = 'product_name',
    searchQuery = '',
    extra = false
  } = req.query;
  var query = {};
  // If Category is Decalred Defunct
  if (req.query.category) {
    var inject = { category: req.query.category };
    query = { ...inject, ...query };
  }
  var inject = { [searchFor]: { $regex: searchQuery, $options: 'i' } };
  query = { ...query, ...inject };
  const count = await dbSearch[searchDB].count(query);
  var selectOptions = dbSelect[searchDB].standard;

  if (extra) {
    selectOptions += dbSelect[searchDB].extra;
  }
  dbSearch[searchDB]
    .find(query, selectOptions)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .then(result => {
      var newOutput = [];
      var escapedResult = result;
      for (idx in escapedResult) {
        escapedResult[idx][
          'product_link'
        ] = `/api/product/product_info?documentId=${escapedResult[idx]._id}`;
        if (escapedResult[idx].image) {
          escapedResult[
            idx
          ].image = `${process.env.S3_BASE}${escapedResult[idx].image}`;
        }
        newOutput.push(escapedResult[idx]);
      }
      res.json({
        products: newOutput,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page)
      });
    });
});

module.exports = router;
