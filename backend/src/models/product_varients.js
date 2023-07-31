const mongoose = require('mongoose');


const productVarient = mongoose.Schema({
  data: { type: Array, required: true },
  friendly: { type: String, required: true },
});

module.exports = mongoose.model('product_varient', productVarient);
