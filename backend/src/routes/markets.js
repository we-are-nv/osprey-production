//Import Packages
const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const checkAuth = require('../../middleware/check-auth.js');
const multer  = require('multer')
const upload = multer({ dest: './uploads' })
const fs = require('fs')

// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');
const { default: mongoose } = require('mongoose');
const marketPage = require('../models/information-page.js');
const market = require('../models/information.js');
const { uploadBaseMarket, uploadFileMarket } = require('../controller/s3-controller.js');
const { rimrafSync } = require('rimraf');

//Import Model Files


const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//
router.post('/', checkAuth, async (req, res) => {

  var newMarketID = new mongoose.Types.ObjectId();

  var bannerImageURL = `markets/${newMarketID}/images/banner`;
  var thumbnailImageURL = `markets/${newMarketID}/images/thumb`;

  uploadBaseMarket(bannerImageURL,req.body.banner);
  uploadBaseMarket(thumbnailImageURL,req.body.thumb);

  for (idx in req.body.bonus) {
    var currentBonus = req.body.bonus[idx];

    currentBonus.elements.forEach((element, idx) => {
      if (element.source) {
        if (Object.keys(element.source).includes('icon')) {
          var iconURL = `markets/${newMarketID}/images/elements/${element.source.text + element.source.color}`;
          uploadBaseMarket(iconURL, element.source.icon)
          element.source.icon = `/${iconURL}`;
        };
      } else if (element.files) {
        element.files.forEach((element2, idx) => {
          var iconURL = `markets/${newMarketID}/images/files/icons/${element2.name}`;
          uploadBaseMarket(iconURL, element2.icon)
          element2.icon = iconURL;

        })
      }

    });


  }

  const newMarket = new market({
    _id: newMarketID,
    name: req.body.name,
    secondry_title: req.body.secondry,
    lower_title: req.body.lower,
    banner_image: `/${bannerImageURL}`,
    thumbnail_image: `/${thumbnailImageURL}`,
    bonus_cards: req.body.bonus,
  });

  newMarket.save();
  res.json({ message: newMarket });

});

router.post('/file', upload.single('file'),checkAuth, async (req, res) => {
  const foundMarket = await market.findOne({_id:req.query.id});
  const foundCard = foundMarket.bonus_cards.find(x => x.title === req.query.elementTitle);
  const foundElement = foundCard.elements.find(x => x.title === req.query.title);
  const foundFile = foundElement.files.find(x => x.name === req.query.name);

  var fileURL = `markets/${req.query.id}/images/files/files/${foundFile.name}`;
  uploadFileMarket(fileURL,req.file.mimetype,fs.readFileSync('./uploads/'+req.file.filename));

  foundFile['url']= `/${fileURL}`;
  const changedMarket = await market.findOneAndUpdate({_id:req.query.id},foundMarket);
  rimrafSync('./uploads/'+req.file.filename)
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

  var newPage = new marketPage({
    _id: newPageID,
    name: req.body.name,
    elements: req.body.elements
  });

  currentPages.push({ name: req.body.name, id: newPageID });

  marketInfo.pages = currentPages;
  const changesPage = await market.findOneAndUpdate({ _id: req.query.id }, marketInfo);

  newPage.save();
  res.json({ message: 'OK' })



});


module.exports = router;
