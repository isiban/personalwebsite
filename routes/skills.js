;(function() {
  "use strict";

  var express = require("express"),
      skills = require("../data/skills.json"),
      router = express.Router();

  router.get("/", function (req, res) {
    res.json(skills);
  });

  module.exports = router;
})();
