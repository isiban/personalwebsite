;(function() {
  "use strict";

  var gulp =         require("gulp"),
      sass =         require("gulp-sass"),
      cleanCSS =     require('gulp-clean-css'),
      concatCss =    require("gulp-concat-css"),
      autoPrefixer = require("gulp-autoprefixer"),
      clean =        require("gulp-clean"),
      jshint =       require("gulp-jshint"),
      browserify =   require("gulp-browserify"),
      concat =       require("gulp-concat"),
      yaml =         require("gulp-yaml"),
      refresh =      require("gulp-livereload"),
      lrserver =     require("tiny-lr")(),
      nodemon =      require("gulp-nodemon"),
      notify =       require("gulp-notify"),
      protractor =   require("gulp-angular-protractor");


  gulp.task("cleanHTML", function () {
    gulp.src(["build/html/*html"], { read: false })
      .pipe(clean());
  });

  gulp.task("cleanCSS", function () {
    gulp.src("build/css/*css", { read: false })
      .pipe(clean());
  });

  gulp.task("cleanJS", function () {
    gulp.src("build/*js", { read: false })
      .pipe(clean({ force: true }));
  });

  gulp.task("clean", ["cleanHTML", "cleanCSS", "cleanJS"]);

  gulp.task("yaml", function () {
    gulp.src("public/javascripts/locales/*.yml")
      .pipe(yaml({ space: 2 }))
      .pipe(gulp.dest("build/locales/"))
  });

  gulp.task("jpgs", function() {
    gulp.src(["public/images/**/*.jpg", "public/images/**/*.png", "public/images/**/*.svg"])
      .pipe(gulp.dest("build/images/"));
  });

  gulp.task("lint", function () {
    gulp.src("public/javascript/*.js")
      .pipe(jshint(".jshintrc"))
      .pipe(notify({
        title: "JSHint Checking",
        message: "JSHint passed. Everything should be OK. Let it fly!"
      }));
  });

  //Task for sass using libsass through gulp-sass
  gulp.task("sass", function() {
    gulp.src("public/stylesheets/sass/*.scss")
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(gulp.dest("public/stylesheets/css"))
      .pipe(concatCss("css/bundle.css"))
      .pipe(autoPrefixer({ browsers: ["> 5%"], cascade: true }))
      .pipe(gulp.dest('./build'))
      .pipe(refresh(lrserver));
  });

  //Task for processing js with browserify
  gulp.task("browserify", function () {
    gulp.src("public/javascripts/main.js")
     .pipe(browserify({
        insertGlobals: true,
        debug: true,
        transform: ["bulkify"]
      }))
     .pipe(concat("bundle.js"))
     .pipe(gulp.dest("./build/js"))
     .pipe(refresh(lrserver));
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

  gulp.task("build", ["jpgs", "sass", "browserify", "yaml", "index", "views"]);

  gulp.task("watch", function () {

    //Add watching on js-files
    gulp.watch("public/javascript/*.js", ["browserify"]);
    //Add watching on html-files
    gulp.watch("views/*.html", ["index", "views"]);
    //Add watching on sass-files
    gulp.watch("public/stylesheets/sass/*.scss", ["sass"]);
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


  gulp.task("default", ["clean", "lint", "build", "watch"], function () {
    // configure nodemon
    nodemon({
      script: "app.js",
      ext: "js"
      }).on("start", function(){
        refresh.listen();
      });
  });

})();
