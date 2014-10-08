var debug = require('debug')('controllers:index');

module.exports = function(app) {

  app.get('/', function* () {
    if (this.user) {
      this.locals.title = '首页';
      yield this.render('index', {title: '首页'});

    } else {
      this.redirect('/login');
    }

  });

  app.get('/login', function* () {
    debug('now is login page...');
    yield this.render('login');
  });

};
