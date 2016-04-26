;(function () {
  "use strict";

  /**
   * [menuController description]
   * @param  {[type]} $scope     [description]
   * @param  {[type]} $state     [description]
   * @param  {[type]} $translate [description]
   * @return {[type]}            [description]
   */
  var menuController = function ($scope, $state, $translate) {
    var _menuItems = [
      {
        name: "about",
        icon: "fa fa-home",
        sref: "about",
        href: "/"
      },
      {
        name: "portfolio",
        icon: "fa fa-briefcase",
        sref: "portfolio",
        href: "/portfolio"
      },
      {
        name: "curriculum",
        icon: "fa fa-file-text-o",
        sref: "curriculum",
        href: "/curriculum"
      },
      {
        name: "contact",
        icon: "fa fa-phone",
        sref: "contact",
        href: "/contact"
      }
    ];

    /**
     * [getMenuItems description]
     * @return {[type]} [description]
     */
    this.getMenuItems = function () {
      return _menuItems;
    };

    /**
     * [isCurrentLanguage description]
     * @return {Boolean} [description]
     */
    this.isCurrentLanguage = function (language) {
      return language === $translate.use();
    };
  };


  var menu = function () {
    return {
      restrict: "A",
      controller: menuController,
      controllerAs: "menuCtrl",
      templateUrl: "html/menu.html"
    };
  };

  module.exports = {
    name: "menu",
    fn: menu
  }

})();
