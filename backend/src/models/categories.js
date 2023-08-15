const mongoose = require('mongoose');
//const market_and_service = require('./market_and_service');
const overview = require('./overview');


// For prod, change required: true

const categoryInfo = mongoose.Schema({
	order: { type: Number, required: false },
	name: { type: String, requried: true, unique: true },
	// sub_text: { type: String, required: false },
	// page_text: { type: String, required: false },
	// image: { type: String, required: true },
	// info: {
	// 	heading: { type: String, required: false },
	// 	sub_heading: { type: String, required: false },
	// 	banner_image: { type: String, required: false },
	// 	sub_text: { type: String, required: false }
	// },
	// page_info_text: {type: String, required: false},
	parent: [{ type: mongoose.Schema.Types.ObjectId, required: false }],
	breadcrumb: { type: String, required: false },
	hasChild: { type: Boolean, required: false },
  // Causes Circular Dependency Error.
  // relatedServices: [{ type: mongoose.Schema.Types.ObjectId,ref:market_and_service }],

	cat_url: { type: String, required: false },
	searchType: { type: String, required: false },
	excluded: { type: Boolean, required: false },
	hasProducts: { type: Boolean, required: false },
	children: { type: Array, required: false },
	routeTo: { type: String, required: false },
  overview: { type: mongoose.Schema.Types.ObjectId, ref: overview },

	// children:[{ type: mongoose.Schema.Types.ObjectId,required:false }],
});

// Test
// module.exports = mongoose.model('cat-test', categoryInfo, 'cat-test');

// Live
module.exports = mongoose.model('category', categoryInfo);
