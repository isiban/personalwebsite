module.exports = function (gulp, plugins) {
  return function () {
    gulp.src("public/images/**/*")
        // .pipe(plugins.imagemin({
        //    progressive: true,
        //    svgoPlugins: [{removeViewBox: false}]
        // }))
        .pipe(gulp.dest("build/images/"));
  };
}
