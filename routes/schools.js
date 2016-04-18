;(function() {
  "use strict";

  var express = require("express"),
      schools = require("../data/schools.json"),
      router = express.Router();

  router.get("/", function (req, res) {
    res.json(schools);
  });

  module.exports = router;
})();
