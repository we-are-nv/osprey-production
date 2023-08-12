const mongoose = require('mongoose');
const categorys = require('./categories');
const product_addit_info = require('./product_addit_info');
const product_varients = require('./product_varients');
const seo_meta = require('./SEO')

const productInfo = mongoose.Schema({
  product_code: { type: String, required: true },
  product_name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  addit_category: { type: String, required: false },
  features: { type: Array, required: false },
  product_link: { type: String, required: false },
  feature_deprec: { type: String, required: false },
  modelUsed: { type: String, requried: true },
  product_url: {type:String,required:false},
  manufacturer: { type: String, required: false },
  searchType: { type: String, required: false },
  tech_drawing: { type: String, required: false },
  tech_drawings: { type: Array, required: false },
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: categorys }],
  additional_information: {
    type: mongoose.Schema.Types.ObjectId,
    ref: product_addit_info
  },
  product_varients: {
    type: mongoose.Schema.Types.ObjectId,
    ref: product_varients
  },
  cost: {
    amount: { type: String, required: false },
    currency: { type: String, required: false }
  },
  seo: {
    type: mongoose.Schema.Types.ObjectId,
    ref:seo_meta,
    required:false
  }
});

module.exports = mongoose.model('product_info', productInfo);
