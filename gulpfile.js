const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

sass2css = function () {
  return src('./sass/app.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('./public/stylesheets/dist/'))
} 


exports.default = function () {
    watch('./sass/**/*.scss', sass2css) 
   
  }