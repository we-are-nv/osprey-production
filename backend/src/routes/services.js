const express = require('express');
const controllers = require('../controller/controllers.js');
const dbQuery = require('../controller/dbQuery');
var breadcrumbs = require('../controller/breadcrumbs');

const allProducts = require('../models/product_info.js');
const etherProd = require('../models/product_types/ethernet_prod.js');


const diskNVR = require('../models/product_types/disk_nvr_prod.js');

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

router.get("/get_items_basic", async (req, res) => {
  var query = {};
  if (req.query.type) {
    var typeSplit = req.query.type.split(",");
    var queryArray = [];
    for (idx in typeSplit) {
      queryArray.push(product_types[typeSplit[idx]]);
    }
    query = { 'productType.modelName': queryArray };
  };
  allProducts.find(query)
    .then((result) => {
      res.json(result)
    })
})

// router.get('/test', async (req,res) => {
//   var test = new providers.disk_nvr ({
//     addit_info:{
//       manufactuer:'yesy',
//       size_tb:1
//     }
//   })
//   test.save()
//   .then((result)=> {
//     console.log(result)
//   })
//   res.json('opk')
// })

// router.get('/info', breadcrumbs.Middleware(), async (req, res) => {
//     try {
//         var data = {}

//         var sqlQuery  = 'SELECT DISTINCT category FROM info'
//         data = await dbQuery.genericQuery(sqlQuery)
//     } catch (error) {
//         console.log(error)
//     }
//     var sendArray = []
//     for (idx in data)
//         sendArray.push(data[idx].category)
//     }
//     res.json({
//         data:sendArray,
//         breadcrumbs:req.breadcrumbs
//     })
// })

// router.get('/info-markets/:category', breadcrumbs.Middleware(), async (req, res) => {

//     try {
// 		var data = {};
// 		var sqlQuery = 'SELECT * FROM info WHERE category = "'+req.params.category+'" ';
// 		data = await dbQuery.genericQuery(sqlQuery);
// 	} catch (error) {
// 		consolee.log(error);
//         errorMessage = {"message":error}
// 	}
//     if (data.length == 0){
//         errorMessage = {"message":"CATNOTFOUND"}
//     } else {
//         errorMessage = {}
//     }
//     res.json({
//         error:errorMessage || {},
//         data:data,
//         breadcrumbs:req.breadcrumbs
//     })
// })

// router.get('/products/cctv', breadcrumbs.Middleware(), async (req, res) => {

//     try {
// 		var data = {};
//         var queryedChanges = req.query;
//         var keyArray = new Array();
//         var paramArray = new Array();
//         var inOr = false;
//         console.log(req.query)
//         for (const [key, value] of Object.entries(req.query)) {
//             keyArray.push(key)
//             paramArray.push(value)

//         }
//         console.log(keyArray)
//         console.log(paramArray)
//         if (keyArray.length != 0){
//             var queryParams = ' WHERE ';
//         } else {
//             var queryParams = '';
//         }

//         for (idx in keyArray){
//             if (keyArray[idx] == 'orStart') {
//                 inOr = true;

//                 queryParams += '('
//             } else if (keyArray[idx] == 'orEnd') {
//                 inOr =false
//                 queryParams += ')'
//             } else {
//                 queryParams += keyArray[idx] + ' = "' + paramArray[idx] + '"';
//             }
//             if (Number(idx) + 1 < keyArray.length && keyArray[idx] != "orStart" && keyArray[Number(idx) + 1] != "orEnd" && inOr){
//                 queryParams += ' OR ';
//             }
//             if (Number(idx) + 1 < keyArray.length && !inOr){
//                 queryParams += ' AND ';
//             }

//         };
//         console.log(queryParams)
// 		var sqlQuery = 'SELECT * FROM info' + queryParams
// 		data = await dbQuery.genericQuery(sqlQuery);
// 	} catch (error) {
// 		console.log(error);

// 	}
//     if (!data){
//         errorMessage = {"message":"ITEMSNOTFOUND","friendly":"Items were not found with the selected parameters"}
//         data = [];
//     } else {
//         errorMessage = {}
//     }
//     res.json({
//         error:errorMessage || {},
//         amountFound:data.length || 0,
//         params:req.query,
//         data:data,
//         breadcrumbs:req.breadcrumbs
//     })
// })



module.exports = router;
