;(function() {
  "use strict";

  require("angular");

  /**
   * [aboutController description]
   * @param  {[type]} $scope     [description]
   * @param  {[type]} $translate [description]
   * @return {[type]}            [description]
   */
  function aboutController ($scope, $translate) {

    /**
     * [isCurrentLanguage description]
     * @return {Boolean} [description]
     */
    this.isCurrentLanguage = function (language) {
      return language === $translate.use();
    };
  }

  module.exports = {
    name: "aboutController",
    fn: aboutController
  };

})();
