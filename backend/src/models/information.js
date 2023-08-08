const mongoose = require('mongoose');
const marketPage = require('./information-page');
const infoBonus = require('./info-bonus');
const informationPage = require('./information-page');
const seo_meta = require('./SEO')

const marketInfo = mongoose.Schema({
	order: { type: Number, required: false },
	name: { type: String, required: true },
	type: { type: String, required: true },
	secondry_title: { type: String, required: false },
	lower_title: { type: String, required: false },
	banner_image: { type: String, required: false },
	thumbnail_image: { type: String, required: false },
	bonus_cards: [
		{
			id: { type: mongoose.Schema.Types.ObjectId, ref: infoBonus },
			name: { type: String, required: true }
		}
	],
	pages: [
		{
			id: { type: mongoose.Schema.Types.ObjectId, ref: informationPage },
			name: { type: String, required: true }
		}
	],
  seo: {
    type: mongoose.Schema.Types.ObjectId,
    ref:seo_meta,
    required:false
  },
	searchType: { type: String, required: false }
});

module.exports = mongoose.model('info', marketInfo);
// module.exports = mongoose.model('info-test', marketInfo, 'info-test');
