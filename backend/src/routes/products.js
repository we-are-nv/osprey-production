const express = require('express');
const controllers = require('../controller/controllers.js');
const dbQuery = require('../controller/dbQuery.js');
var breadcrumbs = require('../controller/breadcrumbs.js');

const allProducts = require('../models/product_info.js');
const etherProd = require('../models/product_types/ethernet_prod.js');
const accProd = require('../models/product_types/accessory_prod.js');
const camProd = require('../models/product_types/camera_prod.js');
const housProd = require('../models/product_types/housing_prod.js')
const diskNVR = require('../models/product_types/disk_nvr_prod.js');
const nvrProd = require('../models/product_types/nvr_prod.js');
const { all } = require('../controller/dbConnector.js');

var providers = {
  disk_nvr: diskNVR
}



var product_types = {
  camera: 'cam_prod',
  accessory: 'acc_prod',
  disk_nvr: 'disk_nvr_prod',
  ethernet: 'ethernet_prod',
  housing: 'housing_prod',
  nvr: 'nvr_prod'
}

const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get("/product_info", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  if (!req.query.type && !req.query.documentId) {
    res.json({ error: 'Please Enter a valid product type' });
    return;
  };

  var popu;
  if (req.query.populate_include) {
    var popuOptions = {}
    if (req.query.populate_include != "all") {
      var tempStore = req.query.populate_include.split(",");
      tempStore.forEach(function (item) {
        popuOptions[item] = 1;
      });
      console.log(popuOptions)
      var popu = {
        path: 'productType.id',
        model: product_types[req.query.type],
        select: popuOptions
      }
    } else {
      var popu = {
        path: 'productType.id',
        model: product_types[req.query.type],
        select: {}
      }
    }

  };

  if (req.query.populate_exclude) {
    var popuOptions = {}
    if (req.query.populate_exclude != "all") {
      var tempStore = req.query.populate_exclude.split(",");
      tempStore.forEach(function (item) {

        popuOptions["-" + item] = 1;
      });
      console.log(popuOptions)
      var popu = {
        path: 'productType.id',
        model: product_types[req.query.type],
        select: popuOptions
      }
    }

  };
  if (req.query.include && req.query.exclude) {
    res.json({ error: 'Cannot include and exclude in same request!' });
    return;
  };
  var selectOptions = "";
  if (req.query.include) {
    var selectOptions = "product_code ";
    var tempStore = req.query.include.split(",");
    selectOptions += tempStore.join(" ");
    //console.log(selectOptions);
  };
  if (req.query.exclude) {
    console.log('a')
    var tempStore = req.query.exclude.split(",");
    tempStore.forEach(function (item) {
      if (item != 'product_code') {
        selectOptions += "-" + item + " ";
      };
    });
    console.log(selectOptions)
  };
  var additQuery = "";
  if (req.query.documentId) {
    additQuery = { _id: req.query.documentId };
  } else {
    additQuery = { 'productType.modelName': product_types[req.query.type] }
  }
  const count = await allProducts.count(additQuery,selectOptions);
  console.log(count)
  allProducts.find(additQuery, selectOptions)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate(popu)
    .then((result) => {
      if (req.query.documentId) {
        res.json({ product: result[0] })
      } else {
        res.json({ products: result,   totalPages: Math.ceil(count / limit),
        currentPage: Number(page) })
      }

    })
});

/*
Search For Products
*/

router.get("/search", async (req, res) => {
  const { page = 1, limit = 10, searchFor = "product_name", searchQuery = "", extra = false } = req.query;
  var query = {};
  if (req.query.type) {
    var inject = {"productType.modelName":product_types[req.query.type]};
    query = {...inject,...query}
  };
  var inject = {[searchFor]:{$regex:searchQuery,$options: "i"}};
  query = {...query, ...inject};
  console.log(query);
  const count = await allProducts.count(query);
  var selectOptions = "product_name product_code ";

  if (extra) {
    selectOptions += "image description"
  }
  allProducts.find(query,selectOptions)
  .limit(limit * 1)
  .skip((page - 1) * limit)
  .then((result) => {
    var newOutput = [];
    var escapedResult = result;
    for (idx in escapedResult){

      escapedResult[idx]["product_link"] = `/api/product/product_info?documentId=${escapedResult[idx]._id}`

      newOutput.push(escapedResult[idx])
    };
    res.json({ products: newOutput,   totalPages: Math.ceil(count / limit),
    currentPage: Number(page) })
  })

})


module.exports = router;
