;(function() {
  "use strict";

  var gulp =    require("gulp"),
      del =     require("del"),
      plugins = require("gulp-load-plugins")(),
      refresh =      require("gulp-livereload"),
      lrserver =     require("tiny-lr")(),
      nodemon =      require("gulp-nodemon"),
      notify =       require("gulp-notify"),
      protractor =   require("gulp-angular-protractor");


  function getTask (task) {
    return require("./gulp-tasks/" + task)(gulp, plugins);
  }


  gulp.task("sass", getTask("sass"));

  gulp.task("scripts", getTask("scripts"));

  gulp.task("locales", getTask("locales"));

  gulp.task("clean:build", function () {
    return del([
      "build/**"
    ]);
  });


  gulp.task("clean", ["clean:build"]);

  gulp.task("jpgs", function() {
    gulp.src(["public/images/**/*.jpg", "public/images/**/*.png", "public/images/**/*.svg"])
      .pipe(gulp.dest("build/images/"));
  });

  gulp.task("index", function () {
    gulp.src("views/index.html")
      .pipe(gulp.dest("./build/"))
      .pipe(refresh(lrserver));
  });

  gulp.task("views", function () {
    gulp.src("views/*.html")
      .pipe(gulp.dest("./build/html"))
      .pipe(refresh(lrserver));
  });

  gulp.task("build", ["jpgs", "sass", "scripts", "locales", "index", "views"]);

  gulp.task("watch", function () {

    //Add watching on js-files
    gulp.watch("public/javascripts/**/*.js", ["scripts"]);
    //Add watching on html-files
    gulp.watch("views/*.html", ["index", "views"]);
    //Add watching on sass-files
    gulp.watch("public/stylesheets/sass/*.scss", ["sass"]);
    // Add watching on locales yml files
    gulp.watch("public/javascripts/locales/**/*.yml", ["locales"]);
  });

  //test task using Protractor
  gulp.task("test", function (callback) {
    gulp.src([
      ".test/spec.js"
    ])
    .pipe(protractor({
      "configFile": "./test/protractor.conf.js",
      "debug": true,
      "autoStartStopServer": true
    }))
    .on("error", function (e) {
      console.log(e);
    })
    .on("end", callback);
  });


  gulp.task("default", ["clean", "build", "watch"], function () {
    // configure nodemon
    nodemon({
      script: "app.js",
      ext: "js"
      }).on("start", function(){
        refresh.listen();
      });
  });

})();
