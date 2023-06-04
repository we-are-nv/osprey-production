const mongoose = require('mongoose');
const categorys = require('./categories');
const product_addit_info = require('./product_addit_info');

const productInfo = mongoose.Schema({
	product_code: { type: String, required: true },
	product_name: { type: String, required: true },
	image: { type: String, required: true },
	description: { type: String, required: true },
	addit_category: { type: String, required: false },
	features: { type: Array, required: false },
	product_link: { type: String, required: false },
	feature_deprec: { type: String, required: false },
  modelUsed:{type:String,requried:true},
	manufacturer: { type: String, required: false },
	tech_drawing: { type: String, required: false },
  tech_drawings: { type: Array, required: false },
	category: { type: mongoose.Schema.Types.ObjectId, ref: categorys },
	additional_information: {
		type: mongoose.Schema.Types.ObjectId,
		ref: product_addit_info
	},
	cost: {
		amount: { type: String, required: false },
		currency: { type: String, required: false }
	}
});

module.exports = mongoose.model('product_info', productInfo);
