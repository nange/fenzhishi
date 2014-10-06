var config = require('./config');
var mongoose = require('mongoose');

var connection = mongoose.createConnection(config.dburl);
 
connection.on('error', function (err) {
  console.log('connection error:' + err);
});

connection.once('open', function() {
  console.log('connection is opened !');
});
 
exports.connection = connection;
