//Import Packages
const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose')
const path = require('path');
// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');

const s3Controller = require('../controller/s3-controller.js');
//Import Model Files
const allProducts = require('../models/product_info.js');
const categories = require('../models/categories.js');
const productModels = require('../models/product_models.js');
const blockList = require('../models/block_list.js');

const multer = require('multer');
const categorys = require('../models/categories.js');
const checkAuth = require('../../middleware/check-auth.js');
const product_addit_info = require('../models/product_addit_info.js');
const user = require('../models/user.js');
const product_info = require('../models/product_info.js');

const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.get('/product_info', async (req, res) => {
  // Default Values are Set
  const { page = 1, limit = 10, subCat = '' } = req.query;

  // Checks to see if a category  is declared. However if a documentId is declared its allowed.
  if (!req.query.category && !req.query.documentId) {
    res.json({ error: 'Please Enter a valid product category' });
    return;
  }

  var popu;
  // Checks to see if populate include is present
  if (req.query.populate_include) {
    var popuOptions = {};

    // If it does not equal all then read each value and format for mongo
    if (req.query.populate_include != 'all') {
      var tempStore = req.query.populate_include.split(',');
      tempStore.forEach(function (item) {
        item = 'info.' + item;
        popuOptions[item] = 1;
      });
      var popu = {
        path: 'additional_information',
        model: 'product_info_addit',
        select: popuOptions
      };
    } else {
      // Else set Popu to display everything.
      var popu = {
        path: 'additional_information',
        model: 'product_info_addit',
        select: {}
      };
    }
  }
  // Checks to see if populate exclude is present
  if (req.query.populate_exclude) {
    var popuOptions = {};
    // If it does not equal all then read each value and format for mongo
    if (req.query.populate_exclude != 'all') {
      var tempStore = req.query.populate_exclude.split(',');
      tempStore.forEach(function (item) {
        item = 'info.' + item;
        popuOptions['-' + item] = 1;
      });
      var popu = {
        path: 'additional_information',
        model: 'product_info_addit',
        select: popuOptions
      };
    }
    // Else nothing happens
  }

  // Checks to ensure include and exclude are not being executed at the same time
  if (req.query.include && req.query.exclude) {
    res.json({ error: 'Cannot include and exclude in same request!' });
    return;
  }
  var selectOptions = '';

  // If include is called pre select product code and then run through each
  if (req.query.include) {
    var selectOptions = 'product_code ';
    var tempStore = req.query.include.split(',');
    selectOptions += tempStore.join(' ');
    //console.log(selectOptions);
  }
  // If exclude is called pre select product code and then run through each
  if (req.query.exclude) {
    console.log('a');
    var tempStore = req.query.exclude.split(',');
    tempStore.forEach(function (item) {
      if (item != 'product_code') {
        selectOptions += '-' + item + ' ';
      }
    });
  }
  var additQuery = '';
  if (req.query.documentId) {
    additQuery = { _id: req.query.documentId };
  } else {
    additQuery = { category: new ObjectId(req.query.category) };
    if (subCat != '') {
      additQuery['productType.modelName'] = subCat;
    }
  }
  // Determine count for Pagination

  const count = await allProducts.count(additQuery, selectOptions);
  allProducts
    .find(additQuery, selectOptions)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate(popu)
    .then(result => {
      if (req.query.documentId) {
        res.json({ product: result[0] });
      } else {
        res.json({
          products: result,
          totalPages: Math.ceil(count / limit),
          currentPage: Number(page)
        });
      }
    });
});

/*
Get Categories
*/

// edited this route so it doesnt clash with the main path

router.get('/categories', async (req, res, next) => {
  categories.find().then(result => {
    console.log('Categories:', result);
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
router.post('/category', upload.single('img'), async (req, res, next) => {
  var filePath = path.join(
    __dirname,
    '../',
    '../uploads',
    'uploaded.' + req.file.originalname.split('.')[1]
  );
  var cat = new categorys({
    name: req.query.name,
    image: `${process.env.S3_BASE}/products/categories/images/${req.query.name
      }.${req.file.originalname.split('.')[1]}`
  });
  cat
    .save()
    .then(result => {
      s3Controller.uploadFile(
        filePath,
        req.query.name + '.' + req.file.originalname.split('.')[1],
        'categories',
        req.file.originalname.split('.')[1]
      );
      res.send({ message: 'Category Added', category: cat });
    })
    .catch(error => {
      console.log('Existing');
      s3Controller.uploadFile(
        filePath,
        req.query.name + '.' + req.file.originalname.split('.')[1],
        'categories',
        req.file.originalname.split('.')[1]
      );
      res.json({ message: 'Imaged Updated' });
    });
  console.log(filePath);
});





/*
Create Product
*/
router.post('/', checkAuth, async (req, res, next) => {
  const foundModel = await productModels.findOne({ type_name: req.body.modelName, category: req.body.category });
  if (foundModel == null) {
    res.json({ error: "ModelDosentExist" });
    return;
  };

  //Ensure Additional Info Model Matches Given Model
  var bodyObjectKeys = Object.keys(req.body.additInfo);
  var modelObjectKeys = Object.keys(foundModel.data);

  // Soft Check Keys Match
  if (modelObjectKeys.filter(x => !bodyObjectKeys.includes(x)).length > 0){
    res.json({ error: "InvalidModel",missing: modelObjectKeys.filter(x => !bodyObjectKeys.includes(x))});
    return;
  };

  // TODO Hard Check Internal Keys

  //Create and Send AdditInfo and get ObjectKey
  var newAdditInfo = new product_addit_info({
    info:req.body.additInfo,
    modelName:req.body.modelName
  });
  const createdAdditInfo = await newAdditInfo.save();
  var additInfoId = createdAdditInfo._id;


  // Create Object ID for new Document
  var newProductID = new mongoose.Types.ObjectId();

  //Predict Image URL
  var predictedImageURL = `${process.env.S3_BASE}/products/${req.body.category}/${req.body.modelName}/images/${newProductID}`;


  //Inject Additional Fields Into Main Info
  var finalMainObj = {
    ...req.body.mainInfo,
    image:predictedImageURL,
    category:new mongoose.Types.ObjectId(req.body.category),
    additional_information:new mongoose.Types.ObjectId(additInfoId)
  };

  var newMainObj = new product_info({
    _id:newProductID,
    ...finalMainObj
  });

  // Save New Product
  const createdNewProd = await newMainObj.save();

  // Upload Image to AWS S3 Bucket

  s3Controller.uploadBase(req.body.modelName,req.body.category,newProductID,req.body.img);


  res.json({message:'Product Added',product:createdNewProd});
});


/*
Search For Products
*/

router.get('/search', async (req, res) => {
  // Declare Default Values
  const {
    page = 1,
    limit = 10,
    searchFor = 'product_name',
    searchQuery = '',
    extra = false
  } = req.query;
  var query = {};
  // If Category is Decalred
  if (req.query.category) {
    var inject = { category: req.query.category };
    query = { ...inject, ...query };
  }
  var inject = { [searchFor]: { $regex: searchQuery, $options: 'i' } };
  query = { ...query, ...inject };
  const count = await allProducts.count(query);
  var selectOptions = 'product_name product_code ';

  if (extra) {
    selectOptions += 'image description';
  }
  allProducts
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
