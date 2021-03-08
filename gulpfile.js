const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

sass.compiler = require('node-sass');

// Paths

const libSrc = './nice-forms.scss'
const libDest = './dist'
const docsStyleSrc = './docs/scss/*.scss'
const docsStyleDest = './docs/css'

// PostCSS plugins

const plugins = [
    autoprefixer(),
    cssnano()
];

// ----------- TASKS

gulp.task('compile-docs', function () {
    return gulp.src(docsStyleSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(docsStyleDest));
});

gulp.task('compile-dist', function() {
    return gulp.src(libSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest(libDest));
})

gulp.task('watch', function() {
    return gulp.watch([docsStyleSrc, libSrc], ['compile-docs']);
})
