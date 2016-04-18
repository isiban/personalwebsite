;(function() {
  "use strict";

  require("angular");

  function contactController ($scope) {
    var _formModel = {
      lastName: "",
      firstName: "",
      phoneNumber: "",
      email: "",
      object: "",
      message: ""
    };

    /**
     * [getFormModel description]
     * @return {[type]} [description]
     */
    this.getFormModel = function () {
      return _formModel;
    };

    /**
     * [sendFormInformation description]
     * @return {[type]} [description]
     */
    this.sendFormInformation = function () {

    };

  };

  module.exports = {
    name: "contactController",
    fn: contactController
  };

})();
