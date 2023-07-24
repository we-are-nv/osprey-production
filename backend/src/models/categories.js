const mongoose = require('mongoose');

// For prod, change required: true

const categoryInfo = mongoose.Schema({
  name: { type: String, requried: true, unique: true },
  image: { type: String, required: true },
  info: {
    heading: { type: String, required: false },
    sub_heading: { type: String, required: false },
    banner_image: { type: String, required: false }
  },
  parent: { type: mongoose.Schema.Types.ObjectId, required: false },
  breadcrumb: { type: String, required: false },
  hasChild: { type: Boolean, required: false },
  searchType: { type: String, required: false },

  // children:[{ type: mongoose.Schema.Types.ObjectId,required:false }],
})


module.exports = mongoose.model('category', categoryInfo);
