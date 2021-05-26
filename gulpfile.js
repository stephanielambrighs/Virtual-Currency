const {src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const minify = require('gulp-minify');
let cssmin = require('gulp-cssmin');
let rename = require('gulp-rename');


sass2css = function () {
  return src('./sass/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./public/stylesheets/dist/'))
}


jsMinify = function () {
  return src(['./public/javascripts/*.js'])
    .pipe(minify({}))
    .pipe(dest('./public/javascripts/dist/app.js'))
}


exports.cssMinify = function (){
  return src(['./public/stylesheets/dist/app.css'])
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(dest('./public/dist/'));
}


exports.default = function () {
  watch('./sass/**/*.scss', sass2css)
   watch('./public/javascripts/*.js', jsMinify)
//   watch('./public/stylesheets/dist/app.css', cssMinify)
 }