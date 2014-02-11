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
          hostname: '0.0.0.0',
          //base: 'mockup',
          port: 9000,
          keepalive: true
        }
      }
    },
    watch: {
      scripts: {
        files: 'less/*.less',
        tasks: ['less']        
      }
    }

  });
 
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less']);
  grunt.registerTask('server', ['connect']);
 
};
