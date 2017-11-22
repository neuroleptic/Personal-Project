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
  manufacturer: {
    type: String,
    required: true
  },
  coreMaterial: {
    type: String,
    required: true
  },
  outerMaterial: {
    type: String,
    required: true
  },
  tonalTraits: {
    type: String,
    required: true
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
});
    
module.exports = mongoose.model('String', StringSchema);