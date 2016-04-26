;(function() {
  "use strict";

  /**
   * [curriculumController description]
   * @param  {[type]} $scope     [description]
   * @param  {[type]} $rootScope [description]
   * @param  {[type]} $filter    [description]
   * @param  {[type]} $translate [description]
   * @param  {[type]} fetchData  [description]
   * @return {[type]}            [description]
   */
  function curriculumController ($scope, $rootScope, $filter, $translate, fetchData) {
    var _experiences = {},
      _schools = {},
      _skills = {},
      _dataFetched = false,
      _navBar = [
        {
          name: "skills",
          translation: $filter("translate")("translation.curriculum.nav.skills")
        },
        {
          name: "experiences",
          translation: $filter("translate")("translation.curriculum.nav.experiences")
        },
        {
          name: "education",
          translation: $filter("translate")("translation.curriculum.nav.education")
        }
      ],
      _activeSection = _navBar[0],
      _activeExperience = ["talentoday"];



    var init = function() {
      fetchData.fetch("/api/skills").then(function (response) {
        _skills = response.data;
        _dataFetched = true;
      });
    }

    init();


    /**
     * [getSkills description]
     * @return {[type]} [description]
     */
    this.getSkills = function () {
      return _skills;
    };

    /**
     * [dataIsFetched description]
     * @return {[type]} [description]
     */
    this.dataIsFetched = function () {
      return _dataFetched;
    };

    /**
     * [getNavBarItems description]
     * @return {[type]} [description]
     */
    this.getNavBarItems = function () {
      return _navBar;
    };

    /**
     * [setActiveItem description]
     */
    this.setActiveItem = function (index) {
      _activeSection = _navBar[index];
    };

    /**
     * [isActiveSection description]
     * @param  {[type]}  sectionName [description]
     * @return {Boolean}             [description]
     */
    this.isActiveSection = function (sectionName) {
      return _activeSection.name === sectionName;
    };

    /**
     * [getActiveItemCssClass description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    this.getActiveItemCssClass = function (index) {
      return { active: _activeSection.name === _navBar[index].name };
    };

    /**
     * [isActiveExperience description]
     * @param  {[type]}  experienceName [description]
     * @return {Boolean}                [description]
     */
    this.isActiveExperience = function (experienceName) {
      return _activeExperience.indexOf(experienceName) !== -1;
    };

    /**
     * [toggleExperiencesDescription description]
     * @param  {[type]} experienceName [description]
     * @return {[type]}                [description]
     */
    this.toggleExperiencesDescription = function (experienceName) {
      if (_activeExperience.indexOf(experienceName) === -1) {
        _activeExperience.push(experienceName);
      } else {
        var index = _activeExperience.indexOf(experienceName);
        _activeExperience.splice(index, 1);
      }
    }

    /**
     * [getActiveClass description]
     * @param  {[type]} index [description]
     * @return {[type]}       [description]
     */
    this.getExperiencesActiveCssClass = function (experienceName) {
      return { active: _activeExperience.indexOf(experienceName) !== -1 }
    };

    $rootScope.$on("$translateChangeSuccess", function () {
      _navBar[0].translation = $filter("translate")("translation.curriculum.nav.skills");
      _navBar[1].translation = $filter("translate")("translation.curriculum.nav.experiences");
      _navBar[2].translation = $filter("translate")("translation.curriculum.nav.education");
    });

  };

  module.exports = {
    name: "curriculumController",
    fn: curriculumController
  };

})();
