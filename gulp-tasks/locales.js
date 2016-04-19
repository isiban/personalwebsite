module.exports = function (gulp, plugins) {
  return function () {
    gulp.src("public/javascripts/locales/**/*.yml")
      .pipe(plugins.yaml({ space: 2 }))
      .pipe(gulp.dest("build/locales/"))
  };
};
