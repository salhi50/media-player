const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));

/* Scss Task */

gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
           .pipe(sass())
           .pipe(concat('main.css'))           
           .pipe(gulp.dest('dist'))
});

/* Gulp watch */

gulp.task('watch', function() {
    gulp.watch('assets/scss/main.scss', gulp.series('sass'));
})

