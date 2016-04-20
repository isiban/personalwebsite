;(function () {
  "use strict";

  require("angular");

  /**
   * [portfolioDetailsController description]
   * @param  {[type]} $scope [description]
   * @return {[type]}        [description]
   */
  var portfolioDetailsController = function ($scope, eventManager) {
    var  _isPhotoSwipeActive = false,
        _activeSlide = {},
        _nextButtonStatus = false,
        _prevButtonStatus = false;

    eventManager.subscribeToEvent($scope, "selectPortfolio", function (opts) {
      _activeSlide = {};
      _isPhotoSwipeActive = false;
      _nextButtonStatus = true;
    });


    /**
     * [getPortfolio description]
     * @return {[type]} [description]
     */
    this.getPortfolio = function () {
      return $scope.portfolio;
    };

    /**
     * [portfolioActive description]
     * @return {[type]} [description]
     */
    this.isPortfolioActive = function () {
      return Object.keys($scope.portfolio).length;
    };

    /**
     * [isPhotoSwipeActive description]
     * @return {Boolean} [description]
     */
    this.isPhotoSwipeActive = function () {
      return _isPhotoSwipeActive;
    };

    /**
     * [getActiveSlide description]
     * @return {[type]} [description]
     */
    this.getActiveSlide = function () {
      if (Object.keys(_activeSlide).length) {
        return _activeSlide;
      }
    };

    /**
     * [getTechnosCssClass description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    this.getTechnosCssClass = function (index) {
      var technoClass = {},
          currentTechno = $scope.portfolio.client.technologies[index];

      technoClass[currentTechno.toLowerCase()] = true;
      return technoClass;
    };

    /**
     * [getNextButtonStatus description]
     * @return {[type]} [description]
     */
    this.getNextButtonStatus = function () {
      return _nextButtonStatus;
    };

    /**
     * [getPrevButtonStatus description]
     * @return {[type]} [description]
     */
    this.getPrevButtonStatus = function () {
      return _prevButtonStatus;
    }

    /**
     * [seeMore description]
     * @return {[type]} [description]
     */
    this.swipeNextScreen = function () {
      _prevButtonStatus = true;
      if (!_isPhotoSwipeActive) {
        _isPhotoSwipeActive = true;
        _activeSlide = $scope.portfolio.images[0]
      } else {
        var currentIndex = $scope.portfolio.images.indexOf(_activeSlide),
            nextIndex = currentIndex + 1;

        if (nextIndex <= $scope.portfolio.images.length - 1) {
          _activeSlide = $scope.portfolio.images[nextIndex];
        }

        if (nextIndex === $scope.portfolio.images.length - 1) {
          _nextButtonStatus = false;
        }
      }
    };

    /**
     * [swipePrevScreen description]
     * @return {[type]} [description]
     */
    this.swipePrevScreen = function () {
      _nextButtonStatus = true;

      var index = $scope.portfolio.images.indexOf(_activeSlide);

      if (index === 0) {
        _isPhotoSwipeActive = false;
        _prevButtonStatus = false;
        _activeSlide = {};
      } else {
        _activeSlide = $scope.portfolio.images[index - 1];
      }
    };

    /**
     * [isActiveSlide description]
     * @param  {[type]}  index [description]
     * @return {Boolean}       [description]
     */
    this.isActiveSlide = function (index) {
      return $scope.portfolio.images[index] === _activeSlide;
    };

    /**
     * [switchFullMode description]
     * @return {[type]} [description]
     */
    this.switchFullMode = function () {
      $scope.fullMode();
    };

    /**
     * [closeActivePortfolio description]
     * @return {[type]} [description]
     */
    this.closeActivePortfolio = function () {
      if (Object.keys($scope.portfolio).length) {
        _nextButtonStatus = false;
        $scope.clearSelectedPortfolio();
      }
    };

  };

  var portfolioDetails = function () {
    return {
      restrict: "A",
      scope: {
        portfolio: "=",
        fullMode: "&",
        clearSelectedPortfolio: "&"
      },
      controller: portfolioDetailsController,
      controllerAs: "portfolioDetailsCtrl",
      templateUrl: "html/portfolio_details.html"
    };
  };

  module.exports = {
    name: "portfolioDetails",
    fn: portfolioDetails
  }

})();
