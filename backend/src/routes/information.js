//Import Packages
const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const checkAuth = require('../../middleware/check-auth.js');
const multer = require('multer')
const upload = multer({ dest: './uploads' })
const fs = require('fs')

// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');
const { default: mongoose } = require('mongoose');
const marketPage = require('../models/information-page.js');
const market = require('../models/information.js');
const { uploadBaseMarket, uploadFileMarket } = require('../controller/s3-controller.js');
const { rimrafSync } = require('rimraf');
const infoBonus = require('../models/info-bonus.js');
const informationPage = require('../models/information-page.js');
const information = require('../models/information.js');

//Import Model Files


const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//
router.post('/', checkAuth, async (req, res) => {

  var newMarketID = new mongoose.Types.ObjectId();

  var bannerImageURL = `info/${newMarketID}/images/banner`;
  var thumbnailImageURL = `info/${newMarketID}/images/thumb`;

  uploadBaseMarket(bannerImageURL, req.body.banner);
  uploadBaseMarket(thumbnailImageURL, req.body.thumb);
  var bonusObj = new Array();
  for (idx in req.body.bonus) {
    const newBonusID = new mongoose.Types.ObjectId();
    var currentBonus = req.body.bonus[idx];
    if (currentBonus.elements) {
      currentBonus.elements.forEach((element, idx) => {
        if (element.source) {
          if (Object.keys(element.source).includes('icon')) {
            var iconURL = `info/${newMarketID}/${newBonusID}/images/elements/${element.source.text + element.source.color}`;
            uploadBaseMarket(iconURL, element.source.icon)
            element.source.icon = `/${iconURL}`;
            currentBonus.elements[idx] = element;
          };
        };
      })

    } else if (currentBonus.files) {
      currentBonus.files.forEach((element2, idx) => {
        var iconURL = `info/${newMarketID}/${newBonusID}/images/files/icons/${element2.name}`;
        uploadBaseMarket(iconURL, element2.icon)
        element2.icon = iconURL;
        currentBonus.files[idx] = element2

      })
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

    newBonus.save();
  }

  const newMarket = new market({
    _id: newMarketID,
    name: req.body.name,
    secondry_title: req.body.secondry,
    lower_title: req.body.lower,
    banner_image: `/${bannerImageURL}`,
    thumbnail_image: `/${thumbnailImageURL}`,
    bonus_cards: bonusObj,
  });

  newMarket.save();
  res.json({ message: newMarket });

});

router.post('/file', upload.single('file'), checkAuth, async (req, res) => {
  const foundMarket = await infoBonus.findOne({ _id: req.query.id });
  const foundFile = foundMarket.files.find(x => x.name === req.query.name);

  var fileURL = `info/${req.query.market}/${req.query.id}/images/files/files/${foundFile.name}`;
  console.log(fileURL)
  uploadFileMarket(fileURL, req.file.mimetype, fs.readFileSync('./uploads/' + req.file.filename));

  foundFile['url'] = `/${fileURL}`;
  const changedMarket = await infoBonus.findOneAndUpdate({ _id: req.query.id }, foundMarket);
  rimrafSync('./uploads/' + req.file.filename)
  res.json(foundMarket)

});


router.post('/page', checkAuth, async (req, res) => {

  if (!req.query.id) {
    res.json({ error: "marketNotDecleared" });
    return;
  };
  var newPageID = new mongoose.Types.ObjectId();
  const marketInfo = await market.findOne({ _id: req.query.id });

  var currentPages = marketInfo.pages;

  for (idx in req.body.elements) {
    if (req.body.elements[idx].type == 'image') {
      req.body.elements[idx].images.forEach((element, idx1) => {
        var fileURL = `info/${req.query.id}/pages/${newPageID}/${req.body.name}${idx1}`;
        uploadBaseMarket(fileURL, element);
        element = `/${fileURL}`;
        req.body.elements[idx].images[idx1] = element;
      })
    };
  }


  var newPage = new informationPage({
    _id: newPageID,
    name: req.body.name,
    elements: req.body.elements
  });

  currentPages.push({ name: req.body.name, id: newPageID });

  marketInfo.pages = currentPages;
  const changesPage = await market.findOneAndUpdate({ _id: req.query.id }, marketInfo);

  newPage.save();
  res.json({ message: 'OK', newPage: newPage })



});

router.get('/', checkAuth, async (req, res) => {
  const foundInfos = await information.find({})
    .populate({ path: 'bonus_cards.id' })
    .populate({ path: 'pages.id' })
  res.json(foundInfos)
});

router.get('/thumbnail', checkAuth, async (req, res) => {
  const foundInfos = await information.find({})
    .select({ name: 1, thumbnail_image: 1 })

  res.json(foundInfos)
});





module.exports = router;
