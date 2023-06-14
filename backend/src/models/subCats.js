const mongoose = require(mongoose);

const subCategory = mongoose.schema({
	name: { type: String, required: false, unique: true },
	image: { type: String, required: false },
	info: {
		heading: { type: String, required: false },
		sub_heading: { type: String, required: false },
		banner_image: { type: String, required: false }
	},
	subSubCats: { type: Array, required: false }
});
