
module.exports = function(app) {

  app.get('/', function* () {
    if (Object.keys(this.session).length) {
      yield this.render('index');

    } else {
      this.redirect('/login');
    }

  });

  app.get('/login', function* () {
    yield this.render('login');
  });

};
