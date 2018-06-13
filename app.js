;(function() {
  "use strict";

  var express        = require("express"),
      livereload     = require("connect-livereload"),
      bodyParser     = require("body-parser"),
      app            = express(),
      server         = require("http").createServer(app),
      common         = require("./common"),
      config         = common.config();


  app.use(livereload({ port: config.livereloadPort}));
  app.use(express.static("./build"));

  app.set("views", __dirname + "/views");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));


  // Route API
  var portfolios = require("./routes/portfolios"),
      skills = require("./routes/skills"),
      contact = require("./routes/mailto");


  app.use("/api/portfolios", portfolios);
  app.use("/api/skills", skills);
  app.use("/api/contact", contact);

  app.get("*", function (req, res) {
    res.sendFile(__dirname + "/build/index.html");
  });

  server.listen(config.port, function () {
    console.log("Listening on port: " + config.port);
  });

})();
