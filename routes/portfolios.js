;(function() {
  "use strict";

  var express = require("express"),
      portfolios = require("../data/portfolios.json"),
      router = express.Router();

  router.get("/", function (req, res) {
    res.json(portfolios);
  });

  module.exports = router;
})();
