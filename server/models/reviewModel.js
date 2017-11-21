const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  _parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'String'
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
    
module.exports = mongoose.model('Review', ReviewSchema);