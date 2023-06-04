//Import Packages
const express = require('express');
const fs = require('fs');
var ObjectId = require('mongoose').Types.ObjectId;
const multer = require('multer');
const dotEnv = require('dotenv').config();

// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');
const path = require('path');
const checkAuth = require('../../middleware/check-auth.js');


const router = express.Router();

//Import Models
const categories = require('../models/categories.js');

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


/*
Get Categories
*/

// edited this route so it doesnt clash with the main path

router.get('/',async (req, res, next) => {
  categories.find().then(result => {
    console.log('Categories:', result);
    for (idx in result) {
      if (result[idx].image){
        result[idx].image = `${process.env.S3_BASE}${result[idx].image}`
      };
    };
    res.json({ cats: result });
  });
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
router.post('/',checkAuth, upload.single('img'), async (req, res, next) => {
  var filePath = path.join(
    __dirname,
    '../',
    '../uploads',
    'uploaded.' + req.file.originalname.split('.')[1]
  );
  var newCatId = new mongoose.Types.ObjectId();
  s3Controller.uploadCatImage(filePath,newCatId,req.file.originalname.split('.')[1]);
  var newCat = new categorys({
    _id:newCatId,
    name:req.query.name,
    image:`/products/categories/images/${newCatId}`
  })
  newCat.save();
  res.json({message:'CatSaved'})
});

/*
Create Category
*/
router.put('/',checkAuth, upload.single('img'), async (req, res, next) => {
  var filePath = path.join(
    __dirname,
    '../',
    '../uploads',
    'uploaded.' + req.file.originalname.split('.')[1]
  );
  console.log(req.query.id)
  s3Controller.uploadCatImage(filePath,req.query.id,req.file.originalname.split('.')[1]);
  const catUpdated = await categorys.findOneAndUpdate({_id:req.query.id},{name:req.query.newName});
  console.log(catUpdated)
  res.json({message:'CatUpdated'})
});








module.exports = router;
