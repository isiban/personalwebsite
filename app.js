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
      schools = require("./routes/schools"),
      skills = require("./routes/skills");


  app.use("/api/portfolios", portfolios);
  app.use("/api/schools", schools);
  app.use("/api/skills", skills);

  app.get("*", function (req, res) {
    res.sendFile(__dirname + "/build/index.html");
  });

  server.listen(process.env.PORT || config.port);

})();
