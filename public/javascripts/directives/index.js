;(function () {
  "use strict";

  require("angular");

  var bulk = require("bulk-require"),
      directiveFolders = bulk(__dirname, ["./*.js"]),
      app = angular.module("app.directives", []);

  for (var prop in directiveFolders) {
    if (prop !== "index") {
      var directiveObject = require("./" + prop + ".js");
      app.directive(directiveObject.name, directiveObject.fn);
    }
  }

  module.exports = app;

})();
