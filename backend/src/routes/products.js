const express = require('express');


var breadcrumbs = require('../controller/breadcrumbs.js');
var ObjectId = require('mongoose').Types.ObjectId;
const allProducts = require('../models/product_info.js');

const categories = require('../models/categorys.js')
const prodAdiit = require('../models/product_addit_info.js')


const masterProd = require('../models/product_addit_info.js');
const productModels = require('../models/product_models.js')
const blockList = require('../models/block_list.js')





const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


router.get("/product_info", async (req, res) => {
  // Default Values are Set
  const { page = 1, limit = 10, subCat = "" } = req.query;
  // Checks to see if a type is declared. However if a documentId is declared its allowed.
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

          item = "info."+item


        popuOptions[item] = 1;
      });
      console.log(popuOptions)
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
    }

  };
  // Checks to see if populate exclude is present
  if (req.query.populate_exclude) {
    var popuOptions = {}
      // If it does not equal all then read each value and format for mongo
    if (req.query.populate_exclude != "all") {
      var tempStore = req.query.populate_exclude.split(",");
      tempStore.forEach(function (item) {
        item = "info."+item
        popuOptions["-" + item] = 1;
      });
      console.log(popuOptions)
      var popu = {
        path: 'additional_information',
        model: 'product_info_addit',
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
    additQuery = { 'category': new ObjectId(req.query.category) };
    if (subCat != ""){
      additQuery['productType.modelName'] = subCat;
    };
  }
  console.log(additQuery)
  console.log(selectOptions)
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
Get Categories
*/

router.get("/categories", async (req,res,next) => {
  console.log("test")
  categories.find()
  .then((result) => {
    res.json({cats:result})
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
  if (req.query.category) {
    var inject = { "category": req.query.category};
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



//   router.get("/get_model_structure", async (req, res) => {
//     // Default Values
//     const { selectedModel = "product" } = req.query;

//     // Grab keys from selected database
//     var props = Object.keys(data_models[selectedModel].provider.schema.paths);
//     var objectTypes = new Array();
//     var otherCats = [];
//     for (idx in props){
//       // Create split list for nested values
//       var splitList = data_models[selectedModel].provider.schema.paths[props[idx]].path.split(".")

//       if (splitList.length > 1){
//         //console.log('more!')
//         //console.log(splitList);

//           var obj = {
//             name:splitList[1],
//           type:data_models[selectedModel].provider.schema.paths[props[idx]].instance
//           };
//           if (!otherCats[splitList[0]] ){
//             otherCats[splitList[0]] = [obj]
//           } else {
//             otherCats[splitList[0]].push(obj)
//           }
//           //
//         //console.log(otherCats[splitList[0]] )


//       } else if (data_models[selectedModel].provider.schema.paths[props[idx]].path != "_id" && data_models[selectedModel].provider.schema.paths[props[idx]].path != "__v") {
//         console.log(data_models[selectedModel].provider.schema.paths[props[idx]].instance)
//         var obj = {
//           name:data_models[selectedModel].provider.schema.paths[props[idx]].path,
//           type:data_models[selectedModel].provider.schema.paths[props[idx]].instance
//         };
//         objectTypes.push(obj);
//       }

//     };
//     var otherCatKeys = Object.keys(otherCats);
//     if (objectTypes.length != 0){
//       var pushObj = {rootValues:objectTypes};
//     } else {
//       var pushObj = {};
//     }

//     for (nIdx in otherCatKeys){
//       pushObj = {...pushObj, [otherCatKeys[nIdx]]:otherCats[otherCatKeys[nIdx]]};
//     }
//   res.json(pushObj)
// });


module.exports = router;
