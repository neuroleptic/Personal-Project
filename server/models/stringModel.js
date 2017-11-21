const mongoose = require('mongoose');

const StringSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});
    
module.exports = mongoose.model('String', StringSchema);