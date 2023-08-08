const express = require('express');
const dotenv = require('dotenv');
const SEO = require('../models/SEO');
const { Model, default: mongoose } = require('mongoose');
const product_info = require('../models/product_info');
const categories = require('../models/categories');
const information = require('../models/information');
const news = require('../models/news');

dotenv.config();

const router = express.Router();

router.use(function timelog(req, res, next) {
  console.log(`Time: ${Date.now()}`);
  next();
});


router.get('/', async (req, res) => {
  const gatheredSEO = await SEO.find();
  res.json({ seo: gatheredSEO });
});

var types = {
  'product': product_info,
  'category': categories,
  'info':information,
  'news':news
}

router.post('/', async (req, res) => {
  const { type = 'product', id = "" } = req.query;
  if (!mongoose.Types.ObjectId.isValid(id)){
    res.json({message:'Please enter valid ID'})
    return;
  };
  const itemExists = await types[type].exists({_id:id});
  if (!itemExists){
    res.json({message:'Please enter valid ID and correct type'})
    return;
  };
  var newSEOID = new mongoose.Types.ObjectId;
  var newSEO = new SEO({
    _id:newSEOID,
    ...req.body
  });
  const updatedObj = await types[type].findOneAndUpdate({_id:id},{'seo':newSEOID});
  newSEO.save();
  res.json({message:'Created And Linked'})

});
module.exports = router;
