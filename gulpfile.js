const gulp = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const browserSync = require("browser-sync").create();

sass.compiler = require("node-sass");

// ----------- PATHS

const libSrc = "./src/*.scss";
const libDest = "./dist/";
const docsStyleSrc = "./docs/scss/*.scss";
const docsStyleDest = "./docs/css";
const demoSrc = "./docs/*.html"

// ----------- POSTCSS PLUGINS

const plugins = [autoprefixer(), cssnano()];

// ----------- TASKS

gulp.task("compile-docs", function () {
  return gulp
    .src(docsStyleSrc)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(docsStyleDest));
});

gulp.task("compile-dist", function () {
  return gulp
    .src(libSrc)
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss(plugins))
    .pipe(gulp.dest(libDest));
});

gulp.task("watch", function () {
  browserSync.init({
    server: {
      baseDir: "./docs/",
    },
  });
  
  gulp.watch([docsStyleSrc, libSrc], gulp.series("compile-docs"));
  gulp.watch([docsStyleDest, demoSrc]).on("change", browserSync.reload);
});
