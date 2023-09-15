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
    standard: 'product_name product_code searchType image gallery tech_drawings ',
    extra: 'description'
  },
  "page": {
    standard: "name searchType image ",
    extra: "elements"
  },
  "info": {
    standard: "name type searchType image ",
    extra: "banner_image thumbnail_image bonus_cards pages"
  },
  "category": {
    standard: "name image searchType image cat_url ",
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
      for (idx in result) {
        // Find Image Strings and Add Base URL
        if (result[idx].image) {
          //result[idx].image = `${process.env.S3_BASE}${result[idx].image}`;
        }
      }
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
        if (escapedResult[idx].gallery){
          for (gIdx in escapedResult[idx].gallery){
            escapedResult[idx].gallery[gIdx] = `${process.env.S3_BASE}${escapedResult[idx].gallery[gIdx]}`;
          }
        }
        if (escapedResult[idx].tech_drawings){
          for (tIdx in escapedResult[idx].tech_drawings){
            escapedResult[idx].tech_drawings[tIdx] = `${process.env.S3_BASE}${escapedResult[idx].tech_drawings[tIdx]}`;
          }
        }
        var friendlyProduct = `/product/${escapedResult[idx].product_code}/${escapedResult[idx].product_name.split(" ").join("-").toLowerCase()}`;
        escapedResult[idx]['product_url'] = friendlyProduct;
        newOutput.push(escapedResult[idx]);
      }
      res.json({
        results: newOutput,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page)
      });
    });
});

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

const name_standards = {
  'product': 'product_name',
  "page": "name",
  "info": "name",
  "category": "name"
};

router.get('/all', async (req, res) => {
  const {
    page = 1,
    limit = 10,
    searchQuery = '',
    extra = false
  } = req.query;
  const searchDBs = [allProducts, informationPage, information, categories];
  var final_result = {}

  for (idx in searchDBs) {
    var plainDB = getKeyByValue(dbSearch, searchDBs[idx]);
    var inject = { [name_standards[plainDB]]: { $regex: searchQuery, $options: 'i' } };
    var selectOptions = dbSelect[plainDB].standard;

    var result_retuned = await dbSearch[plainDB]
      .find(inject, selectOptions)
    try {
      //console.log(result_retuned)
      for (idx in result_retuned) {
        // Find Image Strings and Add Base URL
        if (result_retuned[idx].image) {
          result_retuned[idx].image = `${process.env.S3_BASE}${result_retuned[idx].image}`;
          //console.log('Image Patched')
        }
        if (result_retuned[idx].searchType == "category") {
          const foundChildren = await categories.find({"parent":result_retuned[idx]._id})
          if (foundChildren.length > 1){
            result_retuned[idx].cat_url = `/products/${result_retuned[idx].name.split(" ").join("-").toLowerCase()}`;
          } else {
            const hasProds = await product_info.find({"category":[result_retuned[idx]._id]})
            if (hasProds.length > 1){
              result_retuned[idx].cat_url = `/search/${result_retuned[idx].name.split(" ").join("-").toLowerCase()}`;
            } else {
              const foundInfoss = await information.findOne({"type":result_retuned[idx]._id})
              console.log(foundInfoss)
              result_retuned[idx].cat_url = `/info-page/${result_retuned[idx]._id}/${foundInfoss._id}`;
            }
            console.log(hasProds.length)
          }
          //console.log(foundChildren)
          //console.log('cat patched')


          //console.log(result_retuned[idx].cat_url)
        }
      }
      if (final_result[result_retuned[0].searchType] == undefined) {
        final_result[result_retuned[0].searchType] = []
      };
      //console.log(result_retuned)
      final_result[result_retuned[0].searchType] = [...final_result[result_retuned[0].searchType], ...result_retuned];
    }
    catch (err) {
      final_result = final_result
    };



  };
  //console.log(final_result)
  res.json({ results: final_result })
})

module.exports = router;
