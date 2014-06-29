/**
 * mongodb连接池
 */
var MongoClient = require('mongodb').MongoClient;
var poolModule = require('generic-pool');
var config = require('../config');

module.exports = poolModule.Pool({
  name     : 'mongodb',
  create   : function(callback) {
    MongoClient.connect(config.dburl, {
    	server: {poolSize: 1}
    }, function(err, db) {
    	callback(err, db);
    });
  },
  destroy  : function(db) { db.close(); },
  max      : 20,
  min      : 5, 
  idleTimeoutMillis 	: 60000,
  reapIntervalMillis  : 60000,
  log : true 
});
