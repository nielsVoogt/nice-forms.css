const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

sass.compiler = require('node-sass');

gulp.task('compile-css:dist', function () {
    const plugins = [ autoprefixer(), cssnano() ];

    return gulp.src('./nice-forms.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dist'));
});

gulp.task('compile-css:docs', function() {
    return gulp.src('./docs/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./docs/css'));
})

gulp.task('watch', function() {
    return gulp.watch(['./public/stylesheets/*.scss'], ['sass']);
})