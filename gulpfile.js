var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');

gulp.task('css', function () {
  gulp.src('./less/fenzhishi.less')
    .pipe(less())
    .pipe(autoprefix('last 2 version', 'ie 11'))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function () {
   gulp.watch('./less/**/*.less', ['css']);
});

gulp.task('default', ['watch']);
