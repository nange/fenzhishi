requirejs.config({
  baseUrl: '/js',
  paths: {
    // base
    jquery: 'lib/jquery-2.1.0',

    // lib
    emulateTransitionEnd: 'lib/transition',
    collapse: 'lib/collapse',
    dropdown: 'lib/dropdown',
    tab: 'lib/tab',

    // module
    moduleA: 'module/moduleA',
    moduleB: 'module/moduleB',

    // page
    index: 'page/index',
    login: 'page/login'
  },
  shim: {
    'emulateTransitionEnd': {
      deps: ['jquery'],
      exports: 'jQuery.fn.emulateTransitionEnd'
    },
    'collapse': {
      deps: ['jquery', 'emulateTransitionEnd'],
      exports: 'jQuery.fn.collapse'
    },
    'dropdown': {
      deps: ['jquery'],
      exports: 'jQuery.fn.dropdown'
    },
    'tab': {
      deps: ['jquery', 'emulateTransitionEnd'],
      exports: 'jQuery.fn.tab'
    }
  }

});

require(['jquery', 'index', 'login'],
function($, index, login) {
$(function() {

  index();
  login();

});
});
