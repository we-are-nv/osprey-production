const selectedModel = require('../src/models/product_types/nvr_prod');
const madeProducts = require('../src/models/product_info');

const addTo = require('../src/models/product_addit_info')
const mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;


const path = require('path');
const fs = require('fs')
require('dotenv').config({ path: path.join(__dirname, "../", '.env') });

mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch(err => {
    console.log('Connection Failed' + err);
  });
async function test() {
  const result = await selectedModel.find();
  for (idx in result) {
    console.log(result[idx]._id)
    const newResult = await madeProducts.findOne({ "productType.id": result[idx]._doc._id })
    if (!newResult) {
      console.log('ERROR NO PRODUCT FOUND! Skipping')
    } else {
      var exitingString = newResult._id.toString();
      var info = {}
      console.log(result[idx]._doc)
      for (const [key, value] of Object.entries(result[idx]._doc)) {
        if (key != "_id" && key != "__v") {
          info[key] = value;
        }

      };
      var newObj = new addTo({
        info: info,
        modelName: 'nvr',
        productId: new ObjectId(newResult._id)
      })
      //console.log(info)
      newObj.save();
      //masterFile.push(newObj);
      //console.log(masterFile)
    }
  }

}
test();
// var masterFile = []
// selectedModel.find()
//   .then((result) => {
//     for (idx in result) {
//       storedData = result[idx];
//       const test = await madeProducts.findOne({ "productType.id": result[idx]._doc._id })
//       console.log(test)
//       //   .then((newResult) => {
//       //     console.log(storedData)
//       // //     if (!newResult) {
//       // //       console.log('ERROR NO PRODUCT FOUND! Skipping')
//       // //     } else {
//       // //       var exitingString = newResult._id.toString();
//       // //       var info = {}
//       // //       console.log(result[idx]._doc)
//       // //       for (const [key, value] of Object.entries(result[idx]._doc)) {
//       // //         if (key != "_id" && key != "__v") {
//       // //           info[key] = value;
//       // //         }

//       // //       };
//       // //       var newObj = new addTo({
//       // //         info: info,
//       // //         modelName: 'accessory',
//       // //         productId: new ObjectId(newResult._id)
//       // //       })
//       // //       //console.log(info)
//       // //       newObj.save();
//       // //       masterFile.push(newObj);
//       // //       //console.log(masterFile)
//       // //     }

//       // //     fs.writeFileSync('./output.json', JSON.stringify(masterFile))
//       //    })


//     }



//   })


