;(function() {
  "use strict";

  var express        = require("express"),
      livereload     = require("connect-livereload"),
      app            = express(),
      server         = require("http").createServer(app);

  var config = {
    liverealoadPort: 35729,
    port: 8080
  };

  app.use(livereload({ port: config.livereloadPort}));
  app.use(express.static("./build"));

  app.set("views", __dirname + "/views");

  // Route API
  var portfolios = require("./routes/portfolios"),
      skills = require("./routes/skills");


  app.use("/api/portfolios", portfolios);
  app.use("/api/skills", skills);

  app.get("*", function (req, res) {
    res.sendFile(__dirname + "/build/index.html");
  });

  server.listen(config.port, function () {
    console.log("Listening on port: " + config.port);
  });

})();
