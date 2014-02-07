// Grunt configuration.
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
  	  development: {
        options: {
          paths: ["less"]
        },
  	    files: {
  	      "public/css/common.css": "less/common.less",
          "public/css/pages.css": "less/pages.less"
  	    }
  	  }
    },
    connect: {
      server: {
        options: {
          base: 'mockup',
          port: 9000,
          keepalive: true
        }
      }
    }

  });
 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['less']);
  grunt.registerTask('server', ['connect']);
 
};
