;(function() {
  "use strict";

  var gulp =    require("gulp"),
      del =     require("del"),
      plugins = require("gulp-load-plugins")(),
      gulpSequence = require("gulp-sequence"),
      refresh =      require("gulp-livereload"),
      lrserver =     require("tiny-lr")(),
      nodemon =      require("gulp-nodemon");

  function getTask (task) {
    return require("./gulp-tasks/" + task)(gulp, plugins);
  }

  gulp.task("sass", getTask("sass"));
  gulp.task("scripts", getTask("scripts"));
  gulp.task("locales", getTask("locales"));
  gulp.task("images", getTask("images"));
  gulp.task("views", getTask("views"));

  gulp.task("clean:build", function () {
    return del(["build/**"]);
  });

  gulp.task("build", gulpSequence("clean:build", ["images", "sass", "scripts", "locales", "views"]));

  gulp.task("watch", function () {
    gulp.watch("public/javascripts/**/*.js", ["scripts"]);
    gulp.watch("views/*.html", ["views"]);
    gulp.watch("public/stylesheets/sass/*.scss", ["sass"]);
    gulp.watch("public/javascripts/locales/**/*.yml", ["locales"]);
  });


  gulp.task("default", [ "build", "watch"], function () {
    // configure nodemon
    nodemon({
      script: "app.js",
      ext: "js"
      }).on("start", function(){
        refresh.listen();
      });
  });

})();
