
module.exports = function(app) {

  app.get('/', function* () {
    yield  this.render('index');
  });

};
