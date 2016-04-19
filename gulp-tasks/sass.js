module.exports = function (gulp, plugins) {
  return function () {
    gulp.src("public/stylesheets/sass/*.scss")
        .pipe(plugins.sass({"outputStyle": "expanded"}).on("error", plugins.sass.logError))
        .pipe(gulp.dest("public/stylesheets/css"))
        .pipe(plugins.autoprefixer({
          browsers: ["> 5%"],
          cascade: true
        }))
        .pipe(plugins.concatCss("css/bundle.css"))
        .pipe(gulp.dest("./build"))
        .pipe(plugins.livereload())
  };
};
