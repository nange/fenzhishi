var debug = require('debug')('controllers:index');

module.exports = function(app) {

  app.get('/', function *() {
    if (this.user) {
      yield this.render('index', {title: '首页'});

    } else {
      this.redirect('/login');
    }

  });

  app.get('/login', function *() {
    debug('now is login page...');
    yield this.render('login', {
      layout: 'loginLayout'
    });
  });

  app.get('/u/:id', function *() {
    debug('user id: '+ this.params.id);
    yield this.render('home', {title: '个人中心'});
  });

};
