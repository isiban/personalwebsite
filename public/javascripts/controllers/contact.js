;(function() {
  "use strict";

  /**
   * [contactController description]
   * @param  {[type]} $scope [description]
   * @return {[type]}        [description]
   */
  function contactController ($scope, mailContact) {
    var _formModel = {
      lastName: "",
      firstName: "",
      phoneNumber: "",
      email: "",
      object: "",
      message: "",
      captcha: ""
    };

    /**
     * [getFormModel description]
     * @return {[type]} [description]
     */
    this.getFormModel = function () {
      return _formModel;
    };

    /**
     * [displayReCaptcha description]
     * @return {[type]} [description]
     */
    this.displayReCaptcha = function () {
      var isFormFirstName = _formModel.firstName !== "",
          isFormLastName = _formModel.lastName !== "",
          isFormPhoneNumber = _formModel.phoneNumber !== "",
          isFormEmail = _formModel.email !== "",
          isFormObject = _formModel.object !== "",
          isFormMessage = _formModel.message !== "";

      if (isFormFirstName && isFormLastName
          && isFormPhoneNumber && isFormEmail
          && isFormObject && isFormMessage) {
        return true;
      }
      return false;
    };

    /**
     * [sendFormInformation description]
     * @return {[type]} [description]
     */
    this.sendFormInformation = function () {
      // if (_formModel.captcha !== "") {
        mailContact.send(_formModel).then(function (response) {
          console.log("information has been sent from sendInformation Method");
        })
        .catch(function (response) {
          console.log("something went wrong please TODO");
        })
      // }
    };

  };

  module.exports = {
    name: "contactController",
    fn: contactController
  };

})();
