/**
 * Note Model
 *
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema({
  authorid: String,
  noteid: String,
  sysid: String,
  from: String,
  sharetime: Date,
  category: String,
  commentlist: [{
    content: String,
    fromuser: String,
    createtime: Date
  }]
});

module.exports = mongoose.model('Note', schema);
