;(function() {
  "use strict";

  /**
   * [contactController description]
   * @param  {[type]} $scope [description]
   * @return {[type]}        [description]
   */
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
      console.log(_formModel);
    };

  };

  module.exports = {
    name: "contactController",
    fn: contactController
  };

})();
