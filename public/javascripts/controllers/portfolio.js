;(function() {
  "use strict";

  /**
   * [portfolioController description]
   * @param  {[type]} $scope       [description]
   * @param  {[type]} fetchData    [description]
   * @param  {[type]} eventManager [description]
   * @return {[type]}              [description]
   */
  function portfolioController ($scope, fetchData, eventManager) {
    var _ctrl = this,
        _portfolios = [],
        _selectedPortfolio = {},
        _dataFetched = false,
        _fullMode = false;

    var init = function() {
      fetchData.fetch("/api/portfolios").then(function (response) {
        _portfolios = response.data;
        _dataFetched = true;
      })
    };

    init();

    /**
     * [getPorfolios description]
     * @return {[type]} [description]
     */
    this.getPorfolios = function () {
      return _portfolios;
    };

    /**
     * [dataIsFetched description]
     * @return {[type]} [description]
     */
    this.dataIsFetched = function () {
      return _dataFetched;
    };

    /**
     * [getSelectedPortfolio description]
     * @return {[type]} [description]
     */
    this.getSelectedPortfolio = function () {
      return _selectedPortfolio;
    };

    /**
     * [toggleActivePortfolio description]
     * @param  {[type]} index     [description]
     * @param  {[type]} portfolio [description]
     * @return {[type]}           [description]
     */
    this.toggleActivePortfolio = function (index, portfolio) {
      _selectedPortfolio = portfolio;
      eventManager.fireEvent("selectPortfolio", {});
    };

    /**
     * [getExpandedCssClass description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    this.getPortoflioCssClass = function (index) {
      var classes = {};

      classes[_portfolios[index].class] = true;
      classes["selected"] = _portfolios[index] === _selectedPortfolio;

      return classes;
    };

    /**
     * [switchFullModeState description]
     * @return {[type]} [description]
     */
    this.switchFullModeState = function () {
      _fullMode = !_fullMode;
    };

    /**
     * [getFullModeCssClass description]
     * @return {[type]} [description]
     */
    this.getFullModeCssClass = function () {
      return { full: _fullMode };
    };

    /**
     * [clearSelectedPortfolio description]
     * @return {[type]} [description]
     */
    this.clearSelectedPortfolio = function () {
      _selectedPortfolio = {};
      if (_fullMode) {
        _ctrl.switchFullModeState();
      }
    };
  };

  module.exports = {
    name: "portfolioController",
    fn: portfolioController
  };

})();
