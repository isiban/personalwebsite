module.exports = function (gulp, plugins) {
  return function (callback) {
    gulp.src([".test/spec.js"])
        .pipe(plugins.angularProtractor({
          "configFile": "./test/protractor.conf.js",
          "debug": true,
          "autoStartStopServer": true
        }))
        .on("error", function (e) {
          console.log(e);
        })
        .on("end", callback);
  };
};
