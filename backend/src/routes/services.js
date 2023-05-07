const express = require('express');
const controllers = require('../controller/controllers.js');
const dbQuery = require('../controller/dbQuery');
var breadcrumbs = require('../controller/breadcrumbs');

const allProducts = require('../models/product_info.js');
const etherProd = require('../models/product_types/ethernet_prod.js');
const accProd = require('../models/product_types/accessory_prod.js');
const camProd = require('../models/product_types/camera_prod.js');
const housProd = require('../models/product_types/housing_prod.js')
const diskNVR = require('../models/product_types/disk_nvr_prod.js');
const nvrProd = require('../models/product_types/nvr_prod.js');

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
  if (!req.query.type){
    res.json({error:'Please Enter a valid product type'});
    return;
  };

  var popu;
  if (req.query.populate_include){
    var popuOptions = {}
    if (req.query.populate_include != "all"){
      var tempStore = req.query.populate_include.split(",");
      tempStore.forEach(function(item){
        popuOptions[item] = 1;
      });
      console.log(popuOptions)
      var popu = {
        path:'productType.id',
        model:product_types[req.query.type],
        select:popuOptions
      }
    } else {
      var popu = {
        path:'productType.id',
        model:product_types[req.query.type],
        select:{}
      }
    }

  };

  if (req.query.populate_exclude){
    var popuOptions = {}
    if (req.query.populate_exclude != "all"){
      var tempStore = req.query.populate_exclude.split(",");
      tempStore.forEach(function(item){

        popuOptions["-"+item] = 1;
      });
      console.log(popuOptions)
      var popu = {
        path:'productType.id',
        model:product_types[req.query.type],
        select:popuOptions
      }
    }

  };
  if (req.query.include && req.query.exclude){
    res.json({error:'Cannot include and exclude in same request!'});
    return;
  };
  var selectOptions = "";
  if (req.query.include){
    var selectOptions = "product_code ";
    var tempStore = req.query.include.split(",");
    selectOptions += tempStore.join(" ");
    //console.log(selectOptions);
  };
  if (req.query.exclude){
    console.log('a')
    var tempStore = req.query.exclude.split(",");
    tempStore.forEach(function(item){
      if (item != 'product_code'){
        selectOptions += "-"+item+" ";
      };
    });
    console.log(selectOptions)
  };
  var additQuery = "";
  if (req.query.documentId){
    additQuery = {_id:req.query.documentId};
  } else {
    additQuery = {'productType.modelName':product_types[req.query.type]}
  }
  allProducts.find(additQuery,selectOptions)
  .populate(popu)
  .then((result) => {
    if (req.query.documentId){
      res.json({product:result[0]})
    } else {
      res.json({products:result})
    }

  })
});





module.exports = router;
