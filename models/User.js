/**
 * User Model
 *
 */
var db = require('../database');
var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var userSchema = mongoose.Schema({
  id: Number,
  nickname: String,
  mark: {},
  pic: String,
  follow: [Number],
  follower: [Number],
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

autoIncrement.initialize(db.connection);

userSchema.plugin(autoIncrement.plugin, {
  model: 'User',
  field: 'id',
  startAt: 1000,
  incrementBy: 3
});

module.exports = db.connection.model('User', userSchema);
