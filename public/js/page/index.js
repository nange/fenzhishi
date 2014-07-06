define(['jquery', 'moduleA'], function($, moduleA) {
  moduleA.init();

  return {
    init: function() {
      console.log('index page init success.');
    }
  };

});