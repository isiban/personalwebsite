;(function () {
  "use strict";

  /**
   * [selectLanguagesController description]
   * @param  {[type]} $scope [description]
   * @return {[type]}        [description]
   */
  var selectLanguagesController = function ($scope, $rootScope, $translate, eventManager) {
    var _selectedItem = {},
        _dropdownVisible = false,
        _items = [
          {
            name: "Français",
            key: "fr"
          },
          {
            name: "English",
            key: "en"
          }
        ];

    /**
     * init method:
     * Set the selected language based on $translate
     * @return {}
     */
    var init = function () {
      var willSelected = _items.filter(function (item) {
        return item.key === $translate.use();
      });

      _selectedItem = willSelected[0];
    };

    init();
    /**
     * [getMenuItems description]
     * @return {[type]} [description]
     */
    this.getItems = function () {
      return _items;
    }

    /**
     * [getSelectedItem description]
     * @return {[type]} [description]
     */
    this.getSelectedItem = function () {
      return _selectedItem;
    }

    /**
     * [changeLanguage description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    this.changeLanguage = function (index) {
      _selectedItem = _items[index];
      $translate.use(_items[index].key);
      eventManager.fireEvent("localeUpdated", {});
    }

    /**
     * [getDropdownVisibility description]
     * @return {[type]} [description]
     */
    this.getDropdownVisibility = function () {
      return _dropdownVisible;
    }

    /**
     * [switchDropdownVisibility description]
     * @return {[type]} [description]
     */
    this.switchDropdownVisibility = function () {
      _dropdownVisible = !_dropdownVisible;
    }

    /**
     * [getSelectedCountryCssClass description]
     * @return {[type]} [description]
     */
    this.getSelectedCountryCssClass = function () {
      var selectedCountryClass = {};
      selectedCountryClass[_selectedItem.key] = true;

      return selectedCountryClass;
    }

    /**
     * [getCountryCssClass description]
     * @return {[type]} [description]
     */
    this.getCountryCssClass = function (index) {
      var countryClass = {};
      countryClass[_items[index].key] = true;

      return countryClass;
    }

    /**
     * [getSelectItemCssClass description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    this.getSelectItemCssClass = function (index) {
      return { selected: _items[index] === _selectedItem };
    }

    $rootScope.$on("documentClicked", function(inner, target) {
      if (target[0] !== document.querySelector(".dropdown_list") && target[0] !== document.querySelector(".selected_language")) {
        $scope.$apply(function () {
          _dropdownVisible = false;
        });
      }
    });
  };


  var selectLanguages = function () {
    return {
      restrict: "A",
      controller: selectLanguagesController,
      controllerAs: "selectLanguagesCtrl",
      templateUrl: "html/select_languages.html"
    };
  };

  module.exports = {
    name: "selectLanguages",
    fn: selectLanguages
  }

})();
