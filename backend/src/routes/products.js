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
  camera: camProd,
  accessory: accProd,
  disk_nvr: diskNVR,
  ethernet: etherProd,
  housing: housProd,
  nvr: nvrProd,
  product:allProducts
}



var product_types = {
  camera: 'cam_prod',
  accessory: 'acc_prod',
  disk_nvr: 'disk_nvr_prod',
  ethernet: 'ethernet_prod',
  housing: 'housing_prod',
  nvr: 'nvr_prod',
  product:'product_info'

}

const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get("/product_info", async (req, res) => {
  // Default Values are Set
  const { page = 1, limit = 10 } = req.query;

  // Checks to see if a type is declared. However if a documentId is declared its allowed.
  if (!req.query.type && !req.query.documentId) {
    res.json({ error: 'Please Enter a valid product type' });
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
        popuOptions[item] = 1;
      });
      console.log(popuOptions)
      var popu = {
        path: 'productType.id',
        model: product_types[req.query.type],
        select: popuOptions
      };

    } else {
      // Else set Popu to display everything.
      var popu = {
        path: 'productType.id',
        model: product_types[req.query.type],
        select: {}
      }
    }

  };
  // Checks to see if populate exclude is present
  if (req.query.populate_exclude) {
    var popuOptions = {}
      // If it does not equal all then read each value and format for mongo
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
    console.log(selectOptions)
  };
  var additQuery = "";
  if (req.query.documentId) {
    additQuery = { _id: req.query.documentId };
  } else {
    additQuery = { 'productType.modelName': product_types[req.query.type] }
  }

  // Determine count for Pagination

  const count = await allProducts.count(additQuery, selectOptions);
  console.log(count)
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
Search For Products
*/

router.get("/search", async (req, res) => {

  // Decleare Default Values
  const { page = 1, limit = 10, searchFor = "product_name", searchQuery = "", extra = false } = req.query;
  var query = {};
  // If Type is Decalred afdd
  if (req.query.type) {
    var inject = { "productType.modelName": product_types[req.query.type] };
    query = { ...inject, ...query }
  };
  var inject = { [searchFor]: { $regex: searchQuery, $options: "i" } };
  query = { ...query, ...inject };
  console.log(query);
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

        escapedResult[idx]["product_link"] = `/api/product/product_info?documentId=${escapedResult[idx]._id}`

        newOutput.push(escapedResult[idx])
      };
      res.json({
        products: newOutput, totalPages: Math.ceil(count / limit),
        currentPage: Number(page)
      })
    })

});




  router.get("/get_model_structure", async (req, res) => {
    // Default Values
    const { selectedModel = "product" } = req.query;

    // Grab keys from selected database
    var props = Object.keys(providers[selectedModel].schema.paths);
    var objectTypes = new Array();
    var otherCats = [];
    for (idx in props){
      // Create split list for nested values
      var splitList = providers[selectedModel].schema.paths[props[idx]].path.split(".")

      if (splitList.length > 1){
        //console.log('more!')
        //console.log(splitList);

          var obj = {
            name:splitList[1],
          type:providers[selectedModel].schema.paths[props[idx]].instance
          };
          if (!otherCats[splitList[0]] ){
            otherCats[splitList[0]] = [obj]
          } else {
            otherCats[splitList[0]].push(obj)
          }
          //
        //console.log(otherCats[splitList[0]] )


      } else if (providers[selectedModel].schema.paths[props[idx]].path != "_id" && providers[selectedModel].schema.paths[props[idx]].path != "__v"){
        console.log(providers[selectedModel].schema.paths[props[idx]].instance)
        var obj = {
          name:providers[selectedModel].schema.paths[props[idx]].path,
          type:providers[selectedModel].schema.paths[props[idx]].instance
        };
        objectTypes.push(obj);
      }

    };
    var otherCatKeys = Object.keys(otherCats);
    if (objectTypes.length != 0){
      var pushObj = {rootValues:objectTypes};
    } else {
      var pushObj = {};
    }

    for (nIdx in otherCatKeys){
      pushObj = {...pushObj, [otherCatKeys[nIdx]]:otherCats[otherCatKeys[nIdx]]}
    }
  res.json(pushObj)
});


module.exports = router;
