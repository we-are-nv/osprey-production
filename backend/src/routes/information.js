//Import Packages
const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const checkAuth = require('../../middleware/check-auth.js');
const multer = require('multer');
const upload = multer({ dest: './uploads' });
const fs = require('fs');

// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');
const { default: mongoose } = require('mongoose');
const marketPage = require('../models/information-page.js');

const market = require('../models/information.js');
const {
	uploadBaseMarket,
	uploadFileMarket
} = require('../controller/s3-controller.js');
const { rimrafSync } = require('rimraf');
const infoBonus = require('../models/info-bonus.js');
const informationPage = require('../models/information-page.js');
const acreds = require('../models/acreds.js');
const information = require('../models/information.js');
const { info } = require('console');

// Image Control
const s3Controller = require('../controller/s3-controller.js');

//Import Model Files

const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

const internalErr = 'Internal Server Error';

//
router.post('/', checkAuth, async (req, res) => {
	var newMarketID = new mongoose.Types.ObjectId();

	var bannerImageURL = `info/${newMarketID}/images/banner`;
	var thumbnailImageURL = `info/${newMarketID}/images/thumb`;

	// uploadBaseMarket(bannerImageURL, req.body.banner);
	//uploadBaseMarket(thumbnailImageURL, req.body.thumb);
	var bonusObj = new Array();
	for (idx in req.body.bonus) {
		const newBonusID = new mongoose.Types.ObjectId();
		var currentBonus = req.body.bonus[idx];
		if (currentBonus.elements) {
			currentBonus.elements.forEach((element, idx) => {
				if (element.source) {
					if (Object.keys(element.source).includes('icon')) {
						var iconURL = `info/${newMarketID}/${newBonusID}/images/elements/${
							element.source.text + element.source.color
						}`;
						//uploadBaseMarket(iconURL, element.source.icon)
						element.source.icon = `/${iconURL}`;
						currentBonus.elements[idx] = element;
					}
				}
			});
		} else if (currentBonus.files) {
			currentBonus.files.forEach((element2, idx) => {
				var iconURL = `info/${newMarketID}/${newBonusID}/images/files/icons/${element2.name}`;
				//uploadBaseMarket(iconURL, element2.icon)
				element2.icon = iconURL;
				currentBonus.files[idx] = element2;
			});
		}

		var obj = {
			name: currentBonus.title,
			id: newBonusID
		};
		bonusObj.push(obj);
		var newBonus = new infoBonus({
			_id: newBonusID,
			...currentBonus
		});

		// newBonus.save();
	}

	if (req.body.pages.length > 0) {
		for (pIdx in req.body.pages) {
			const foundPage = await informationPage.findOne({
				_id: req.body.pages[pIdx]
			});
			var obj = {
				name: foundPage._doc.name,
				id: req.body.pages[pIdx]
			};
			req.body.pages[pIdx] = obj;
		}
	}

	const newMarket = new market({
		_id: newMarketID,
		name: req.body.name,
		type: req.body.type,
		pages: req.body.pages,
		secondry_title: req.body.secondry,
		lower_title: req.body.lower,
		banner_image: `/${bannerImageURL}`,
		thumbnail_image: `/${thumbnailImageURL}`,
		bonus_cards: bonusObj
	});

	newMarket.save();
	res.json({ message: newMarket });
});

router.post('/file', upload.single('file'), checkAuth, async (req, res) => {
	const foundMarket = await infoBonus.findOne({ _id: req.query.id });
	const foundFile = foundMarket.files.find(x => x.name === req.query.name);

	var fileURL = `info/${req.query.market}/${req.query.id}/images/files/files/${foundFile.name}`;
	console.log(fileURL);
	uploadFileMarket(
		fileURL,
		req.file.mimetype,
		fs.readFileSync('./uploads/' + req.file.filename)
	);

	foundFile['url'] = `/${fileURL}`;
	const changedMarket = await infoBonus.findOneAndUpdate(
		{ _id: req.query.id },
		foundMarket
	);
	rimrafSync('./uploads/' + req.file.filename);
	res.json(foundMarket);
});

router.post('/page', checkAuth, async (req, res) => {
	if (!req.query.id) {
		res.json({ error: 'marketNotDecleared' });
		return;
	}

	console.log(req.query.id, 'hello', req.body)
	var newPageID = new mongoose.Types.ObjectId();
	const marketInfo = await market.findOne({ _id: req.query.id });

	var currentPages = marketInfo.pages;

	for (idx in req.body.elements) {
		if (req.body.elements[idx].type == 'image') {
			req.body.elements[idx].src.forEach((element, idx1) => {
				var fileURL =
					`info/${req.query.id}/pages/${newPageID}/${req.body.name}${idx1}`.replace(
						/\s/g,
						''
					);
				uploadBaseMarket(fileURL, element);
				element = `/${fileURL}`;
				req.body.elements[idx].src[idx1] = element;
			});
		}
	}

	var newPage = new informationPage({
		_id: newPageID,
		name: req.body.name,
		elements: req.body.elements
	});

	currentPages.push({ name: req.body.name, id: newPageID });

	marketInfo.pages = currentPages;
	const changesPage = await market.findOneAndUpdate(
		{ _id: req.query.id },
		marketInfo
	);

	newPage.save();
	res.json({ message: 'OK', newPage: newPage });
});

router.put('/page', checkAuth, async (req, res) => {
	try {
		const { id } = req.query;
		if (!id) {
			return res.status(400).json({ message: 'Missing page ID' });
		}
		const { name, type } = req.body;
		if (!name || !type) {
			return res.status(400).json({ message: 'Missing name and/ or type' });
		}
		const {
			secondry_title,
			lower_title,
			banner_image,
			thumbnail_image,
			pages,
			bonus_cards
		} = req.body;
		const updateFields = {};
		if (name) updateFields.name = name;
		if (type) updateFields.type = type;
		if (secondry_title) updateFields.secondry_title = secondry_title;
		if (lower_title) updateFields.lower_title = lower_title;

		if (banner_image)
			updateFields.banner_image = s3Controller.singleImage(
				banner_image,
				'info-banner',
				name,
				id
			);

		if (thumbnail_image)
			updateFields.thumbnail_image = s3Controller.singleImage(
				thumbnail_image,
				'info-thumbnail',
				name,
				id
			);

		if (bonus_cards) updateFields.bonus_cards = bonus_cards;

		const foundPage = await market.findOneAndUpdate(
			{ _id: id },
			{ $set: updateFields },
			{ new: true }
		);

		if (!foundPage) {
			return res.status(404).json({ message: 'Page not found' });
		}
		res.json(foundPage);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

// THIS IS THE ROUTE IMAGES ARE FUCKED ON -- REMOVE WHEN FIXED

router.put('/page/sub-page', checkAuth, async (req, res) => {
	try {
		const { id } = req.query;
		const { parent_id } = req.query;
		if (!id) {
			return res.status(400).json({ message: 'Missing page ID' });
		}
		if (!parent_id) {
			return res.status(400).json({ message: 'no parent ID' });
		}
		console.log('child_id is:  ', id);
		console.log('parent_id is:  ', parent_id);

		const { name, elements } = req.body;
		if (!name || !elements) {
			return res.status(400).json({ message: 'Missing name or elements' });
		}

		const findPage = (pages, id) => {
			if (!Array.isArray(pages)) {
				console.log(typeof pages);

				return null;
			}
			return pages.find(page => page.id.toString() === id);
		};

		const foundParent = await market.findOne({ _id: parent_id });
		if (!foundParent) {
			return res.status(400).json({ message: 'no parent page found' });
		}

		const pageToUpdate = findPage(foundParent.pages, id);
		if (!pageToUpdate) {
			return res.status(400).json({ message: 'child page not found' });
		}

		const updatedParent = await market.findOneAndUpdate(
			{ _id: parent_id, 'pages.id': id },
			{ $set: { 'pages.$.name': name } },
			{ new: true }
		);

		for (idx in req.body.elements) {
			if (req.body.elements[idx].type == 'image') {
				req.body.elements[idx].src.forEach((element, idx1) => {
					const s3Base = process.env.S3_BASE;
					if (element.includes(s3Base)) {
						// strip s3 base
						element = element.replace(s3Base, '');
					} else if (element.startsWith('data:')) {
						// convert base64 to file
						const base64Data = element.replace(/^data:image\/\w+;base64,/, '');
						const buffer = Buffer.from(base64Data, 'base64');
						var fileURL =
							`info/${parent_id}/pages/${id}/${req.body.name}-${idx}-${idx1}`.replace(
								/\s/g,
								''
							);
						uploadBaseMarket(fileURL, element);
						element = `/${fileURL}`;
					}
					req.body.elements[idx].src[idx1] = element;
				});
			}
		}

		const foundChild = await informationPage.findOneAndUpdate(
			{ _id: id },
			{ name, elements },
			{ new: true }
		);

		if (!foundChild) {
			return res.status(404).json({ message: ' Child Page not found' });
		}

		res.status(200).json({ updatedParent });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Internal Server Error', error: error });
	}
});

router.get('/', async (req, res) => {
	let foundInfos;
	foundInfos = await information
		.find({ type: req.query.type })
		.populate({ path: 'bonus_cards.id' })
    .populate('seo')
		.populate({ path: 'pages.id' });
	console.log(foundInfos);
	res.json(foundInfos);
});

router.get('/single', async (req, res) => {
	const foundInfos = await information
		.findOne({ _id: req.query.id })
		.populate({ path: 'bonus_cards.id' });
	var routeKeys = Object.keys(foundInfos._doc);
	for (routeIdx in routeKeys) {
		if (routeKeys[routeIdx].includes('image')) {
			foundInfos._doc[routeKeys[routeIdx]] = `${process.env.S3_BASE}${
				foundInfos._doc[routeKeys[routeIdx]]
			}`;
		}
	}

	var bonusCards = foundInfos._doc.bonus_cards;
	for (bonusIdx in bonusCards) {
		var bonusDoc = bonusCards[bonusIdx]._doc.id._doc;
		for (elementIdx in bonusDoc.elements) {
			bonusDoc.elements[
				elementIdx
			].source.icon = `${process.env.S3_BASE}${bonusDoc.elements[elementIdx].source.icon}`;
			console.log(bonusDoc.elements[elementIdx].source.icon);
		}
		for (fileIdx in bonusDoc.files) {
			foundInfos._doc.bonus_cards[bonusIdx].id.files[
				fileIdx
			].url = `${process.env.S3_BASE}${bonusDoc.files[fileIdx].url}`;
			foundInfos._doc.bonus_cards[bonusIdx].id.files[
				fileIdx
			].icon = `${process.env.S3_BASE}${bonusDoc.files[fileIdx].icon}`;
		}
	}

	res.json(foundInfos);
});

router.get('/page', async (req, res) => {
	const foundPage = await informationPage.findOne({ _id: req.query.id });
	if (!foundPage) {
		return res.status(404).json({ message: 'page not found' });
	}

	if (!foundPage._doc.elements) {
		return res.status(404).json({ message: 'Page elements not found' });
	} else {
		var pageElements = foundPage._doc.elements;
	}

	for (idx in pageElements) {
		if (pageElements[idx].type == 'image') {
			pageElements[idx].src.forEach(function (item, pIdx) {
				pageElements[idx].src[
					pIdx
				] = `${process.env.S3_BASE}${pageElements[idx].src[pIdx]}`;
			});
		}
	}

	res.json(foundPage);
});

router.get('/all', checkAuth, async (req, res) => {
	try {
		const result = await informationPage.find();
		res.status(200).json({ message: 'returned data: ' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router.get('/thumbnail', async (req, res) => {
	const { type = '' } = req.query;
	var query = {};
	if (type != '') {
		var query = { type: type };
	}

	const foundInfos = await information
		.find(query)
		.select({ name: 1, thumbnail_image: 1 });
	foundInfos.forEach(function (info) {
		info.thumbnail_image = `${process.env.S3_BASE}${info.thumbnail_image}`;
	});
	res.json(foundInfos);
});

router.delete('/', checkAuth, async (req, res) => {
	try {
		const { idToDelete } = req.query;
		if (!idToDelete) {
			return res.sendStatus(400).json({ message: 'No ID in request' });
		} else {
			const deleted = await information.findByIdAndDelete(idToDelete);
			if (!deleted) {
				return res.sendStatus(404).json({ message: `ID: ${idToDelete} not found` });
			} else {
				res.status(200).json({ message: `ID ${idToDelete} deleted` });
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: `Could not delete ID ${idToDelete}, ${internalErr} ${err}`
		});
	}
});

router.get('/files', async (req, res) => {
	const files = await s3Controller.getFiles();
	files.shift();
	for (idx in files) {
		files[idx].Key = `${process.env.S3_BASE}/${files[idx].Key}`;
	}
	res.json(files);
});

router.get('/accreditations', async (req, res) => {
	const { type = 'all', limit = 100, page = 1 } = req.query;
	var query = {};
	if (type != 'all') {
		query = { type: type };
	}
	const count = await acreds.count(query);

	const accredsReturned = await acreds
		.find(query)
		.limit(limit * 1)
		.skip((page - 1) * limit);
	res.json({
		data: accredsReturned,
		totalPages: Math.ceil(count / limit),
		currentPage: Number(page)
	});
});


module.exports = router;
