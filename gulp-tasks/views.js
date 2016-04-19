module.exports = function (gulp, plugins) {
  return function () {
    gulp.src("views/index.html")
        .pipe(gulp.dest("./build/"))
        .pipe(plugins.livereload());

    gulp.src("views/*.html")
        .pipe(gulp.dest("./build/html"))
        .pipe(plugins.livereload());

  };
};
