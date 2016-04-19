module.exports = function (gulp, plugins) {
  return function () {
    // gulp.src("public/javascripts/**/*.js")
    //     .pipe(plugins.jshint(".jshintrc"))
    //     .pipe(plugins.notify({
    //       title: "JSHint Checking",
    //       message: "JSHint passed. Everything should be OK. Let it fly!"
    //     }));

    gulp.src("public/javascripts/main.js")
        .pipe(plugins.browserify({
          insertGlobals: true,
          debug: true,
          transform: ["bulkify"]
        }))
       .pipe(plugins.concat("bundle.js"))
       .pipe(gulp.dest("./build/js"))
       .pipe(plugins.livereload());
  };
};
