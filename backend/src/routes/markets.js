//Import Packages
const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const checkAuth = require('../../middleware/check-auth.js');

// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');
const { default: mongoose } = require('mongoose');
const marketPage = require('../models/market-page.js');
const market = require('../models/market.js');

//Import Model Files


const router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

//
router.post('/', checkAuth ,async (req, res) => {

  const newMarket = new market({
    name:req.body.name,
    secondry_title:req.body.secondry,
    lower_title:req.body.lower,
    banner_image:req.body.banner,
    thumbnail_image:req.body.banner,
    bonus_cards:req.body.bonus,
  });

  newMarket.save();
  res.json({message:'OK'});

});

module.exports = router;
