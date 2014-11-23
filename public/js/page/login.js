define(['jquery', 'moduleB'], function($, moduleB) {
  moduleB.init();

  return function() {
    console.log('login page init success.');
  }

});