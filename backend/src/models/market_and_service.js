const mongoose = require('mongoose');
const overview = require('./overview');
const product_info = require('./product_info');
const categories = require('./categories');

const markviceSchema = new mongoose.Schema({
  name:{ type: String, required: true },
  type:{ type: String, required: true },
  overview: { type: mongoose.Schema.Types.ObjectId, ref: overview },
  parent: { type: mongoose.Schema.Types.ObjectId },
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref:product_info }],
  relatedServices: [{ type: mongoose.Schema.Types.ObjectId }],
  relatedMarkets: [{ type: mongoose.Schema.Types.ObjectId }],
  associatedCategories: [{ type: mongoose.Schema.Types.ObjectId, ref:categories }],


});

module.exports = mongoose.model('markets_and_service', markviceSchema);
