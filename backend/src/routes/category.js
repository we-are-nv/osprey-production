//Import Packages
const express = require('express');
const fs = require('fs');
const axios = require('axios');
var ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer');
const dotEnv = require('dotenv').config();
const mongoose = require('mongoose');
// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');
const path = require('path');
const checkAuth = require('../../middleware/check-auth.js');

const router = express.Router();

//Import Models
const categories = require('../models/categories.js');

// Image Control
const s3Controller = require('../controller/s3-controller.js');
const product_info = require('../models/product_info.js');
const information = require('../models/information.js');
const informationPage = require('../models/information-page.js');

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

const internalErr = 'Internal Server Error';

/*
Get Categories
*/

// edited this route so it doesnt clash with the main path

router.get('/', async (req, res, next) => {
	console.log('URL');
	console.log(req.url);
	var parent = req.query.parent || undefined;
	try {
		let foundCats;
		foundCats = await categories.find({ parent: parent }).populate('seo');
		foundCats = [...foundCats].sort((a, b) => a.order - b.order);
		// foundCats.forEach(cat => {
		// 	console.log({ name: cat.name, index: cat.order });
		// });
		if (foundCats) {
			//console.log(foundCats)
			//console.log('Categories:', foundCats);
			for (idx in foundCats) {
				const childrenFound = await categories.count({
					parent: foundCats[idx]._id
				});

				var hasChild = false;
				//console.log(childrenFound)
				if (childrenFound > 0) {
					hasChild = true;
				};
        var hasProducts = false;
        var routeTo = 'default';
        if (!hasChild){
          var productsFound = await product_info.count({category:foundCats[idx]._id});
          console.log(productsFound)
          if (productsFound > 0){
            hasProducts = true;
          } else {
            var foundRedirect = await information.findOne({name:foundCats[idx].name});

            if (foundRedirect){
              console.log(foundRedirect.name)
              routeTo = `/info-page/${foundRedirect.type}/${foundRedirect._id}`
            } else {
              var foundRedirect = await informationPage.findOne({name:foundCats[idx].name});
              if (foundRedirect) {
                routeTo = `/info-page/${foundRedirect.type}/${foundRedirect._id}`;
              } else {
                console.log('err')
                console.log(foundCats[idx].name)
              }

            }

          }

        };
        foundCats[idx]['hasProducts'] = hasProducts;
        foundCats[idx]['routeTo'] = routeTo;
				foundCats[idx]['hasChild'] = hasChild;

				if (foundCats[idx].image) {
					foundCats[idx].image = `${process.env.S3_BASE}${foundCats[idx].image}`;
				}
				if (foundCats[idx].info.banner_image) {
					foundCats[
						idx
					].info.banner_image = `${process.env.S3_BASE}${foundCats[idx].info.banner_image}`;
				}
				if (hasChild) {
					var cat_url =
						'/products/' + foundCats[idx].name.split(' ').join('-').toLowerCase();
				} else {
					var cat_url =
						'/search/' + foundCats[idx].name.split(' ').join('-').toLowerCase();
				}

				foundCats[idx].cat_url = cat_url;
			}
			res.json({ cats: foundCats });
		}
	} catch (err) {
		//console.log(foundCats)
		res.json({ cats: [], err: err });
	}
});

router.get('/all-categories', async (req, res) => {
	try {
		const allCategories = await categories.find({}).populate('parent')
		if (!allCategories) {
			return res.status(404).json({ message: 'No categories found' });
		} else {
      var topLevel = [];
      var everythingElse = [];
      for (idx in allCategories) {
        if (allCategories[idx].parent == undefined){
          topLevel.push(allCategories[idx]);
        } else {
          everythingElse.push(allCategories[idx]);
        };
      };

      for (tIdx in topLevel){
        var atIdx = topLevel[tIdx]._id.toString();
          for (cIdx in everythingElse){
            if (everythingElse[cIdx].parent == atIdx){
              topLevel[tIdx].children.push(everythingElse[cIdx])
              for (scIdx in everythingElse){
                if (everythingElse[scIdx].parent.toString() == everythingElse[cIdx]._id){
                  everythingElse[cIdx].children.push(everythingElse[scIdx]);
                };
              };
            };
          };
      };

      res.json({categories:topLevel});
		};
	} catch (err) {
    console.log(err)
		res.status(500).json({ message: `${internalErr}` });
	}
});

const storageEngine = multer.diskStorage({
	destination: './uploads',
	filename: (req, file, cb) => {
		cb(null, `uploaded.` + file.originalname.split('.')[1]);
	}
});
const upload = multer({
	storage: storageEngine
});

/*
Create Category
*/
router.post('/', checkAuth, async (req, res, next) => {
	// var filePath = path.join(
	//   __dirname,
	//   '../',
	//   '../uploads',
	//   'uploaded.' + req.file.originalname.split('.')[1]
	// );
	var newCatId = new mongoose.Types.ObjectId();
	//s3Controller.uploadCatImage(filePath,newCatId,req.file.originalname.split('.')[1]);
	var obj = {};
	if (req.body.parent) {
		obj['parent'] = req.body.parent;

		const foundItem = await categories.findOne({ _id: req.body.parent });
		if (!foundItem['children']) {
			foundItem['children'] = [newCatId];
		} else {
			foundItem['children'] = [...foundItem['children'], newCatId];
		}

		const updatedCat = await categories.findOneAndUpdate(
			{ _id: req.body.parent },
			foundItem
		);
		// console.log(foundItem);
	}

	if (req.body.child) {
		obj['child'] = req.body.child;
	}

	var newCat = new categories({
		_id: newCatId,
		name: req.body.name,
		info: {
			heading: req.body.name,
			sub_heading: 'sub heading field',
			banner_image: 'Banner Image Link'
		},
		image: `/products/categories/images/${newCatId}`,
		...obj
	});
	newCat.save();
	res.json({ message: 'CatSaved', cat: newCat });
});

/*
Create Category
*/
router.put('/', checkAuth, upload.single('img'), async (req, res, next) => {
	var filePath = path.join(
		__dirname,
		'../',
		'../uploads',
		'uploaded.' + req.file.originalname.split('.')[1]
	);
	console.log(req.query.id);
	s3Controller.uploadCatImage(
		filePath,
		req.query.id,
		req.file.originalname.split('.')[1]
	);
	const catUpdated = await categories.findOneAndUpdate(
		{ _id: req.query.id },
		{ name: req.query.newName }
	);
	// console.log(catUpdated);
	res.json({ message: 'CatUpdated' });
});

router.put('/update-category/', checkAuth, async (req, res) => {
	try {
		const { id } = req.query;
		const { name, image, info } = req.body;
		const { banner_image, heading, sub_heading } = {};

		if (!id) {
			console.log('Missing Cat ID');
			return res.status(400).json({ message: 'Missing category ID' });
		}

		if (!name) {
			console.loog('missing name');
			return res.status(400).json({ message: 'Missing name' });
		}

		if (!info) {
			console.log('missing info, but not an issue');
		}

		// if (!name || !image || !info) {
		// 	console.log('Missing Body');
		// 	return res.status(400).json({ message: 'Missing body' });
		// }

		const updateFields = {};
		if (name) updateFields.name = name;
		if (image)
			updateFields.image = s3Controller.singleImage(
				image,
				'cat-thumbnails',
				name,
				id
			);

		if (info) {
			console.log('info loaded');
			let tempInfo = {};
			if (info.heading) tempInfo.heading = info.heading;
			if (info.sub_heading) tempInfo.sub_heading = info.sub_heading;
			if (info.banner_image) {
				tempInfo.banner_image = s3Controller.singleImage(
					info.banner_image,
					'cat-banner',
					name,
					id
				);
			}
			// console.log(tempInfo);

			updateFields.info = tempInfo;
		}

		const foundCategory = await categories.findOneAndUpdate(
			{ _id: id },
			{ $set: updateFields },
			{ new: true }
		);
		if (!foundCategory) {
			console.log(`No category with ID ${id} found`);
			return res.status(404).json({ message: `No category with id ${id}` });
		}
		res.status(200).json({ foundCategory });
	} catch (err) {
		console.error('Error updating database: ', err);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.delete('/', checkAuth, async (req, res) => {
	try {
		const ids = Array.isArray(req.body.id) ? req.body.id : [req.body.id];
		if (!ids || ids.length === 0) {
			return res.status(400).json({ message: 'No ID in request body' });
		}

		const result = await categories.deleteMany({ _id: { $in: ids } });
		const deletedCount = result.deletedCount;
		if (deletedCount === 0) {
			return res.status(404).json({ message: 'Categories not found' });
		}
		res
			.status(200)
			.json({ message: `${deletedCount} categories successfully deleted` });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// Get Single
router.get('/single', async (req, res) => {
	try {
		const id = req.query.id;
		if (id == undefined) {
			return res.status(400).json({ message: 'No ID in Request' });
		}
		const foundCat = await categories.findOne({ _id: id });
		// console.log(foundCat);
		if (!foundCat) {
			return res.status(404).json({ message: 'no Category found with Id ' + id });
		}
		if (foundCat) {
			const s3Base = process.env.S3_BASE;
			if (foundCat.image) {
				foundCat.image = `${s3Base}${foundCat.image}`;
			}
			if (foundCat.info.banner_image) {
				foundCat.info.banner_image = `${s3Base}${foundCat.info.banner_image}`;
			}

			res
				.status(200)
				.json({ message: 'Successfully found category', data: foundCat });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'internal Server Error' });
	}
});

router.get('/convert-route', async (req, res) => {
	if (req.query.name) {
		if (req.query.name == 'top') {
			res.json({ _id: '' });
			return;
		}
		//Prison Cell
		//prison-cell
		var conv = req.query.name.split('-').join(' ');
		const foundProduct = await categories.find({
			['name']: { $regex: conv, $options: 'i' }
		});
		if (foundProduct) {
			for (idx in foundProduct) {
				if (foundProduct[idx].name.toLowerCase() == conv) {
					res.json({ _id: foundProduct[idx]._id });
				}
			}
		} else {
			res.json({ err: 'prod not found' });
		}
	} else {
		res.json({ err: 'invalid params' });
	}
});

module.exports = router;
