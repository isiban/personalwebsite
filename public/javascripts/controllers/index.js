;(function () {
  "use strict";

  require("angular");

  var bulk = require("bulk-require"),
      controllerFolders = bulk(__dirname, ["./*.js"]),
      app = angular.module("app.controllers", []);

  for (var prop in controllerFolders) {
    if (prop !== "index") {
      var controllerObject = require("./" + prop + ".js");
      app.controller(controllerObject.name, controllerObject.fn);
    }
  }


  module.exports = app;

})();
