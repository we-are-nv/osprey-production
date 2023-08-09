//Import Packages
const express = require('express');
var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');
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
const product_model = require('../models/product_models.js')
const user = require('../models/user.js');
const product_info = require('../models/product_info.js');
const information = require('../models/information.js');

const router = express.Router();

router.use(function timeLog(req, res, next) {
  //console.log('Time: ', Date.now());
  next();
});

// var  childArray = new Array();

async function getChildCategories(parentCat, childArray) {
  const childCategories = await categories
    .find({ parent: parentCat })
    .select({ _id: 1 });

  for (childIdx in childCategories) {
    childArray = [
      ...childArray,
      new ObjectId(childCategories[childIdx]._id.toString())
    ];
    childArray = await getChildCategories(
      childCategories[childIdx]._id.toString(),
      childArray
    );
  }

  return childArray;
}

router.get('/product_info', async (req, res) => {
  // Default Values are Set
  const { page = 1, limit = 10, subCat = '', viewChildren = false, sort = 'az' } = req.query;

  // Checks to see if a category  is declared. However if a documentId is declared its allowed.
  if (!req.query.category && !req.query.documentId) {
    res.json({ error: 'Please Enter a valid product category' });
    return;
  };
  if (req.query.category.includes('info-')){
    console.log(req.query.category.split("-")[1]);
    const foundInfo = await information.findOne({_id:req.query.category.split("-")[1]})
    console.log()
    const result = await product_info.find().where('_id').in(foundInfo.suggestProducts).exec();
    for (idx in result){
      if (result[idx].image) {
        result[idx].image = `${process.env.S3_BASE}${result[idx].image}`;
      }
    }

    res.json({products:result})
    return;
  }
  // Configure Sort
  var sortValue = 1;
  if (sort == 'za'){
    sortValue = -1;
  };

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

  var catQuery = [];

  try {
    if (JSON.parse(viewChildren)) {
      catQuery = await getChildCategories(req.query.category, [req.query.category]);
    } else {
      catQuery.push(new ObjectId(req.query.category));
    }
  } catch (err) {
    console.log('Invalid Input. Assuming False');
    console.log(req.query.category)
    if (req.query.category.length > 12){
      catQuery.push(new ObjectId(req.query.category));
    }

  }

  var additQuery = '';
  if (req.query.documentId) {
    additQuery = { _id: req.query.documentId };
  } else {
    additQuery = { category: catQuery };
    //console.log(additQuery)
    if (subCat != '') {
      additQuery['productType.modelName'] = subCat;
    }
  }
  // Determine count for Pagination

  const count = await allProducts.count(additQuery, selectOptions);
  const result = await allProducts
    .find(additQuery, selectOptions)
    .sort({ product_name: sortValue })
    .collation({ locale: "en", caseLevel: true })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .populate(popu)
    //.populate('additional_information')
    .populate('product_varients')
    .populate('seo')
    .populate({
      path: 'category',
      populate: {
        path: 'info',
        model: 'categoryInfo'
      }
    })
  for (idx in result) {
    // Find Image Strings and Add Base URL
    if (result[idx].image) {
      result[idx].image = `${process.env.S3_BASE}${result[idx].image}`;
    }
    var formattedName = result[idx].product_name.replace(/[^a-zA-Z ]/g, "").replace(/  +/g, ' ').split(" ").join("-").toLowerCase();
    var url = `/product/${result[idx].product_code}/${formattedName}`;
    result[idx].product_url = url;
    var catURL = `/products/${result[idx].category.name.split(' ').join('-').toLowerCase()}`;
    result[idx].category.cat_url = catURL

    if (req.query.populate_include && result[idx].additional_information && result[idx].additional_information.info) {
      console.log('HELLO')
      var test = result[idx].additional_information.modelName
      console.log(result[idx].additional_information.modelName)
      const usedModel = await productModels.findOne({ "type_name": test });
      var fields = Object.keys(result[idx].additional_information.info);
      var usedFields = [];
      var modelKeys = Object.keys(usedModel.data);
      var newInfo = {};
      for (mIdx in modelKeys) {

        var currentKey = usedModel.data[modelKeys[mIdx]];
        for (cKey in currentKey) {
          if (!newInfo[modelKeys[mIdx]]) {
            newInfo[modelKeys[mIdx]] = {}
          };
          newInfo[modelKeys[mIdx]][currentKey[cKey]] = result[idx].additional_information.info[currentKey[cKey]];
          if (result[idx].additional_information.info[currentKey[cKey]]) {


            usedFields.push(currentKey[cKey]);
          }

        }
        //console.log(currentKey)
      }
      let difference = fields
        .filter(x => !usedFields.includes(x))
        .concat(usedFields.filter(x => !fields.includes(x)));
      console.log(difference)
      for (d in difference) {
        if (!newInfo['other']) {
          newInfo['other'] = {}
        };
        newInfo['other'][difference[d]] = result[idx].additional_information.info[difference[d]]
      }
      result[idx].additional_information.info = newInfo;

    };
  }


  if (req.query.documentId) {
    res.json({ product: result[0] });
  } else {
    res.json({
      products: result,
      totalPages: Math.ceil(count / limit),
      documentCount: count,
      currentPage: Number(page)
    });
  }

});

/*
Create Product
*/
router.post('/', checkAuth, async (req, res, next) => {
  const foundModel = await productModels.findOne({
    type_name: req.body.modelName
  });
  if (foundModel == null) {
    res.json({ error: 'ModelDosentExist' });
    return;
  };

  //Ensure Additional Info Model Matches Given Model
  var bodyObjectKeys = Object.keys(req.body.additInfo);
  var modelObjectKeys = Object.keys(foundModel.data);

  // Soft Check Keys Match
  if (modelObjectKeys.filter(x => !bodyObjectKeys.includes(x)).length > 0) {
    res.json({
      error: 'InvalidModel',
      missing: modelObjectKeys.filter(x => !bodyObjectKeys.includes(x))
    });
    return;
  }

  // TODO Hard Check Internal Keys (is it needed?)

  //Create and Send AdditInfo and get ObjectKey
  var newAdditInfo = new product_addit_info({
    info: req.body.additInfo,
    modelName: req.body.modelName
  });
  const createdAdditInfo = await newAdditInfo.save();
  var additInfoId = createdAdditInfo._id;

  // Create Object ID for new Document
  var newProductID = new mongoose.Types.ObjectId();

  //Predict Image URLs
  var predictedImageURL = `/products/${req.body.category}/images/main/${newProductID}`;
  var predictedTechImageURLs = [];

  // Handle Multiple Technical Images
  for (imgIdx in req.body.tech_img) {
    s3Controller.uploadBase(
      req.body.modelName,
      req.body.category,
      Number(imgIdx) + 1,
      req.body.tech_img[imgIdx],
      `tech/${newProductID}`
    );
    var tech_img_url = `/products/${req.body.category}/images/tech/${newProductID}/${Number(imgIdx) + 1}`;
    predictedTechImageURLs.push(tech_img_url);
  }

  //Inject Additional Fields Into Main Info
  var finalMainObj = {
    ...req.body.mainInfo,
    image: predictedImageURL,
    tech_drawings: predictedTechImageURLs,

    category: new mongoose.Types.ObjectId(req.body.category),
    additional_information: new mongoose.Types.ObjectId(additInfoId)
  };

  var newMainObj = new product_info({
    _id: newProductID,
    ...finalMainObj
  });

  // Save New Product
  const createdNewProd = await newMainObj.save();

  // Upload Images to AWS S3 Bucket

  s3Controller.uploadBase(
    req.body.modelName,
    req.body.category,
    newProductID,
    req.body.img,
    'main'
  );

  res.json({
    message: 'Product Added',
    product: createdNewProd,
    adiit: createdAdditInfo
  });
});

/*
Update Product
*/

router.put('/', checkAuth, async (req, res) => {
  if (!req.query.id) {
    res.json({ error: 'Please enter valid ID' });
    return;
  }
  try {
    const foundProduct = await product_info.findOne({ _id: req.query.id });

    if (req.body.main) {
      console.log('Changes to be made to main Product!');
      var product_info_keys = new Array();
      product_info.schema.eachPath(function (path) {
        product_info_keys.push(path);
      });
      var bodyKeys = Object.keys(req.body.main);
      for (idx in bodyKeys) {
        if (
          !product_info_keys.includes(bodyKeys[idx]) &&
          bodyKeys[idx] != 'tech_drawing_add' &&
          bodyKeys[idx] != 'tech_drawing_remove'
        ) {
          res.json({ error: 'Invalid Body', field: bodyKeys[idx] });
          return;
        }
      }

      if (bodyKeys.includes('image')) {
        s3Controller.uploadBase(
          foundProduct.modelUsed,
          foundProduct.category,
          foundProduct._id,
          req.body.main.image,
          'main'
        );
        req.body.main.image = foundProduct.image;
      }
      if (
        bodyKeys.includes('tech_drawing_add') ||
        bodyKeys.includes('tech_drawing_remove')
      ) {
        const originalTechImagesArr = foundProduct.tech_drawings;
        if (bodyKeys.includes('tech_drawing_add')) {
          var addTech = req.body.main.tech_drawing_add;
          for (addTechIdx in addTech) {
            var predictedURL = `/products/${foundProduct.category}/${foundProduct.modelUsed
              }/images/tech/${foundProduct._id}/${Number(originalTechImagesArr.length) + 1
              }`;
            s3Controller.uploadBase(
              foundProduct.modelUsed,
              foundProduct.category,
              Number(originalTechImagesArr.length) + 1,
              addTech[addTechIdx],
              `tech/${foundProduct._id}`
            );
            originalTechImagesArr.push(predictedURL);
          }

          //req.body.main.tech_drawing = foundProduct.tech_drawing;
        }
        if (bodyKeys.includes('tech_drawing_remove')) {
          var remove_tech = req.body.main.tech_drawing_remove;
          for (idx in remove_tech) {
            originalTechImagesArr.splice(Number(remove_tech[idx]) - 1);
            var predictedURL = `products/${foundProduct.category}/${foundProduct.modelUsed}/images/tech/${foundProduct._id}/${remove_tech[idx]}`;
            console.log(predictedURL);
            s3Controller.deleteImage(predictedURL);
          }
        }
        req.body.main['tech_drawings'] = originalTechImagesArr;
      }

      //const updatedProd = await product_info.findOneAndUpdate({ _id: req.query.id },req.body.main);
    }

    if (req.body.adit) {
      const updatedAdit = await product_addit_info.findOneAndUpdate(
        { _id: foundProduct.additional_information },
        { info: req.body.adit }
      );
    }
    res.json({
      message: 'Product Updated!',
      updatedFieldsMain: req.body.main,
      updatedFieldsAditt: req.body.adit
    });
    return;
  } catch (error) {
    res.json({ message: 'An error has occured', error: error });
  }
});

/*
Delete Product
*/

router.delete('/', checkAuth, async (req, res) => {
  if (!req.query.id) {
    res.json({ error: 'Please enter valid ID' });
    return;
  }
  try {
    const foundProduct = await product_info.findOne({ _id: req.query.id });
    console.log(foundProduct);
    // Find Images
    var mainImageToDeleteArray = foundProduct.image.split('/');
    var techImageToDeleteArray = foundProduct.tech_drawing.split('/');

    //Remove First Item from Arrays
    mainImageToDeleteArray.shift();
    techImageToDeleteArray.shift();

    // Create S3 Readable Paths
    var mainImageToDelete = mainImageToDeleteArray.join('/');
    var techImageToDelete = techImageToDeleteArray.join('/');

    // Send Delete Command to S3 Controller
    s3Controller.deleteImage(mainImageToDelete);
    s3Controller.deleteImage(techImageToDelete);

    // Delet Prods Additional Info First
    const deletedAditInfo = await product_addit_info.findByIdAndDelete({
      _id: foundProduct.additional_information
    });

    //Delete Main Prod
    const deletedProd = await product_info.findByIdAndDelete({ _id: req.query.id });

    res.json({ message: 'Deleted Product' });
  } catch (error) {
    res.json({ message: 'An error has occured', error: error });
  }
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
        if (escapedResult[idx].image) {
          escapedResult[
            idx
          ].image = `${process.env.S3_BASE}${escapedResult[idx].image}`;
        }
        newOutput.push(escapedResult[idx]);
      }
      res.json({
        products: newOutput,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page)
      });
    });
});

// router.put('/bulk-update', checkAuth, async (req, res) => {
// 	try {
// 		const { ids } = req.body;
// 		const { newCatId } = req.query;
// 		if (!ids) {
// 			return res.status(400).json({ message: 'No Id array found ' });
// 		}
// 		if (!newCatId) {
// 			return res.status(400).json({ message: 'No new category Id found' });
// 		}
// 		const idArr = ids;

// 		const existingId = allProducts.findOne()
// 		const filter = {
// 			category: { $in: idArr.map(id => new mongoose.Types.ObjectId(id)) }
// 		};
// 		const update = { category: newCatId };

// 		const toUpdate = await allProducts.updateMany(filter, update);

// 		const updatedProdArr = toUpdate;
// 		res.status(200).json({ updatedProdArr });
// 	} catch (err) {
// 		console.error(err);
// 		res.status(500).json({ message: 'Internal server error', err });
// 	}
// });

router.put('/bulk-update', checkAuth, async (req, res) => {
  try {
    const { ids } = req.body;
    const { newCatId } = req.query;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Invalid or empty IDs array' });
    }
    if (!newCatId) {
      return res.status(400).json({ message: 'No new category ID found' });
    }

    const existingDocs = await allProducts.find({
      _id: { $in: ids.map(id => new mongoose.Types.ObjectId(id)) }
    });

    const existingIds = existingDocs.map(doc => doc._id.toString());

    const nonExistingIds = ids.filter(id => !existingIds.includes(id));

    if (nonExistingIds.length > 0) {
      return res.status(404).json({
        message: `Documents with the following IDs do not exist: ${nonExistingIds.join(
          ', '
        )}`
      });
    }

    const filter = {
      _id: { $in: ids.map(id => new mongoose.Types.ObjectId(id)) }
    };
    const update = { category: newCatId };

    const toUpdate = await allProducts.updateMany(filter, update);

    const updatedProdArr = toUpdate;
    res.status(200).json({ updatedProdArr });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', err });
  }
});


router.get('/convert-route', async (req, res) => {
  if (req.query.code) {
    const foundProduct = await product_info.findOne({ "product_code": req.query.code});
    if (foundProduct) {
      res.json({ _id: foundProduct._id })
    } else {
      res.json({ err: 'prod not found' })
    }
  } else if (req.query.id) {
    const foundProduct = await product_info.findOne({ "_id": req.query.id });
    var convertedName = foundProduct.product_name.split(" ").join("-").toLowerCase();
    res.json({ code: foundProduct.product_code, name: convertedName });

  } else {
    res.json({ 'err': 'invalid params' });
  }

})

module.exports = router;
