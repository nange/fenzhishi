/**
 * User Model
 *
 */

var mongoose = require('mongoose');
 
var schema = mongoose.Schema({
  userid: String,
  username: String,
  pic: String,
  follow: [String],
  follower: [String],
  star: [String],
  mainType: String,
  token: [{
    type: String,
    value: String
  }],
  message: [{
    fromuser: String, 
    type: String, 
    where: String, 
    readed: Boolean,
    time: Date,
    content: String
  }]
});

module.exports = mongoose.model('User', schema);
