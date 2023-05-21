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
