define(['jquery', 'moduleA'], function($, moduleA) {
  moduleA.init();

  return function() {
    console.log('index page init success.');
  }

});