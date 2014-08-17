requirejs.config({
  baseUrl: '/js',
  paths: {
    // base
    jquery: 'lib/jquery-2.1.0',

    // module
    moduleA: 'module/moduleA',
    moduleB: 'module/moduleB',

    // page
    index: 'page/index',
    login: 'page/login'
  }
});

requirejs(['index', 'login'],
function(index, login) {
  index.init();
  login.init();

  
});
