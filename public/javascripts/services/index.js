;(function () {
  "use strict";

  require("angular");

  var bulk = require("bulk-require"),
      servicesFolders = bulk(__dirname, ["./*.js"]),
      services = angular.module("app.services", []);

  for (var prop in servicesFolders) {
    if (prop !== "index") {
      var servicesObject = require("./" + prop + ".js");
      services.factory(servicesObject.name, servicesObject.fn);
    }
  }

  module.exports = services;

})();
