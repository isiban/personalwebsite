(function () {
  "use strict"

  var env = require('./config');

  exports.config = function() {
    var node_env = process.env.NODE_ENV || 'development';
    return env[node_env];
  };

}) ();

