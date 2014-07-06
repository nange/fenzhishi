define(['jquery', 'moduleB'], function($, moduleB) {
  moduleB.init();

  return {
    init: function() {
      console.log('login page init success.');
    }
  };

});