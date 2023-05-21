//Import Packages
const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;

// Import Controllers
var breadcrumbs = require('../controller/breadcrumbs.js');

//Import Model Files
const allProducts = require('../models/product_info.js');
const categories = require('../models/categorys.js');
const productModels = require('../models/product_models.js');
const blockList = require('../models/block_list.js');

const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get("/product_info", async (req, res) => {
  // Default Values are Set
  const { page = 1, limit = 10, subCat = "" } = req.query;

  // Checks to see if a category  is declared. However if a documentId is declared its allowed.
  if (!req.query.category && !req.query.documentId) {
    res.json({ error: 'Please Enter a valid product category' });
    return;
  };

  var popu;
  // Checks to see if populate include is present
  if (req.query.populate_include) {
    var popuOptions = {};

    // If it does not equal all then read each value and format for mongo
    if (req.query.populate_include != "all") {
      var tempStore = req.query.populate_include.split(",");
      tempStore.forEach(function (item) {
        item = "info." + item
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
      }
    };

  };
  // Checks to see if populate exclude is present
  if (req.query.populate_exclude) {
    var popuOptions = {}
    // If it does not equal all then read each value and format for mongo
    if (req.query.populate_exclude != "all") {
      var tempStore = req.query.populate_exclude.split(",");
      tempStore.forEach(function (item) {
        item = "info." + item
        popuOptions["-" + item] = 1;
      });
      var popu = {
        path: 'additional_information',
        model: 'product_info_addit',
        select: popuOptions
      };
    };
    // Else nothing happens

  };

  // Checks to ensure include and exclude are not being executed at the same time
  if (req.query.include && req.query.exclude) {
    res.json({ error: 'Cannot include and exclude in same request!' });
    return;
  };
  var selectOptions = "";


  // If include is called pre select product code and then run through each
  if (req.query.include) {
    var selectOptions = "product_code ";
    var tempStore = req.query.include.split(",");
    selectOptions += tempStore.join(" ");
    //console.log(selectOptions);
  };
  // If exclude is called pre select product code and then run through each
  if (req.query.exclude) {
    console.log('a')
    var tempStore = req.query.exclude.split(",");
    tempStore.forEach(function (item) {
      if (item != 'product_code') {
        selectOptions += "-" + item + " ";
      };
    });
  };
  var additQuery = "";
  if (req.query.documentId) {
    additQuery = { _id: req.query.documentId };
  } else {
    additQuery = { 'category': new ObjectId(req.query.category) };
    if (subCat != "") {
      additQuery['productType.modelName'] = subCat;
    };
  }
  // Determine count for Pagination

  const count = await allProducts.count(additQuery, selectOptions);
  allProducts.find(additQuery, selectOptions)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate(popu)
    .then((result) => {
      if (req.query.documentId) {
        res.json({ product: result[0] })
      } else {
        res.json({
          products: result, totalPages: Math.ceil(count / limit),
          currentPage: Number(page)
        })
      }

    })
});

/*
Get Categories
*/

router.get("/categories", async (req, res, next) => {
  categories.find()
    .then((result) => {
      res.json({ cats: result });
    });
});


/*
Search For Products
*/

router.get("/search", async (req, res) => {

  // Declare Default Values
  const { page = 1, limit = 10, searchFor = "product_name", searchQuery = "", extra = false } = req.query;
  var query = {};
  // If Category is Decalred
  if (req.query.category) {
    var inject = { "category": req.query.category };
    query = { ...inject, ...query };
  };
  var inject = { [searchFor]: { $regex: searchQuery, $options: "i" } };
  query = { ...query, ...inject };
  const count = await allProducts.count(query);
  var selectOptions = "product_name product_code ";

  if (extra) {
    selectOptions += "image description"
  }
  allProducts.find(query, selectOptions)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .then((result) => {
      var newOutput = [];
      var escapedResult = result;
      for (idx in escapedResult) {
        escapedResult[idx]["product_link"] = `/api/product/product_info?documentId=${escapedResult[idx]._id}`;
        newOutput.push(escapedResult[idx])
      };
      res.json({
        products: newOutput, totalPages: Math.ceil(count / limit),
        currentPage: Number(page)
      });
    });

});



router.get("/get_model_structure", async (req, res) => {
  // Default Values
  const { selectedModel = "camera", category = "646896611b216e6dcc0da06a", showTypes = "true", showUnused = "true" } = req.query;

  if (!category){
    res.json({errorNumber:41,errorMessage:"Category Not Declared"});
    return;
  }

  const model = await productModels.findOne({"type_name":selectedModel});
  const blockRaw = await blockList.findOne({"category":category});
  var blockArray = blockRaw._doc.data;
  var returnArray = new Array();
  var keys = Object.keys(model._doc.data);
  var usedFieldsArr = [];
  var unusedFieldsArr = [];
  for (idx in keys){
    var relBlock = blockArray.filter(obj => { return obj.type_name === keys[idx] });
    //console.log(keys[1])
    var relBlockKeys = Object.keys(relBlock[0].data);
    var intersection = relBlockKeys.filter(x => !model._doc.data[keys[idx]].includes(x));

    if (showTypes == "true"){
      for (usedIdx in model._doc.data[keys[idx]]){
        var pushObj = {
          name:model._doc.data[keys[idx]][usedIdx],
          type:relBlock[0].data[model._doc.data[keys[idx]][usedIdx]].type
        };
       usedFieldsArr.push(pushObj);
      };
      for (unUsedIdx in intersection){
        var pushUnObj = {
          name:intersection[unUsedIdx],
          type:relBlock[0].data[intersection[unUsedIdx]].type
        };
        unusedFieldsArr.push(pushUnObj)
      }
    } else {
      usedFieldsArr = model._doc.data[keys[idx]];
      unusedFieldsArr = intersection;
    };

    var obj = {
      block_name:keys[1],
      usedFields:usedFieldsArr,
    };
    if (showUnused == "true"){
      obj['unusedFields'] = unusedFieldsArr;
    };
    returnArray.push(obj);
  };
  res.json({modelData:returnArray})

});


module.exports = router;
