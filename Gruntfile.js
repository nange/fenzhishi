// Grunt configuration.
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
		  development: {
		    files: {
		      "public/css/style.css": "less/style.less"
		    }
		  }
		}

	});
 
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['less']);
 
};
