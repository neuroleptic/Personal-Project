const mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  }
});
 
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);