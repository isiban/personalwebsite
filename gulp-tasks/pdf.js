module.exports = function (gulp, plugins) {
  return function () {
    gulp.src("public/pdf/*.pdf")
        .pipe(gulp.dest("./build/pdf/"));
  };
};
