
module.exports = function(app) {

  app.get('/', function* () {
    if (this.user) {
      yield this.render('index');

    } else {
      this.redirect('/login');
    }

  });

  app.get('/login', function* () {
    yield this.render('login');
  });

};
