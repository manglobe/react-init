const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('html',()=>{
  gulp.src('sourse/**')
  .pipe(replace(/{#TITLE#}/,''))
  .pipe(gulp.dest('end/'))
})