;(function() {
  "use strict";

  require("angular");
  require("angular-touch");
  require("angular-cookies");
  require("@uirouter/angularjs");
  require("angular-translate");
  require("angular-translate-loader-static-files");
  require("angular-translate-storage-local");
  require("angular-translate-storage-cookie");
  require("./controllers");
  require("./directives");
  require("./services");

  angular.module("myApp", [
    "ui.router",
    "ngTouch",
    "pascalprecht.translate",
    "ngCookies",
    "app.controllers",
    "app.directives",
    "app.services"
  ]).config(function ($locationProvider, $stateProvider, $urlRouterProvider, $compileProvider, $translateProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $compileProvider.debugInfoEnabled(true);

    $translateProvider
      .useStaticFilesLoader({
        files: [{
            prefix: "locales/",
            suffix: ".json"
        }]
      })
      .preferredLanguage("en")
      .fallbackLanguage("en");

     $translateProvider.useLocalStorage();

    $stateProvider
      .state("about", {
        url: "/",
        controller: "aboutController",
        controllerAs: "aboutCtrl",
        templateUrl: "html/about.html"
      })
      .state("portfolio", {
        url: "/portfolio",
        controller: "portfolioController",
        controllerAs: "portfolioCtrl",
        templateUrl: "html/portfolio.html"
      })
      .state("curriculum", {
        url: "/curriculum",
        controller: "curriculumController",
        controllerAs: "curriculumCtrl",
        templateUrl: "html/curriculum.html"
      })
      .state("contact", {
        url: "/contact",
        controller: "contactController",
        controllerAs: "contactCtrl",
        templateUrl: "html/contact.html"
      })
      .state("404", {
        url: "/404",
        templateUrl: "html/404.html"
      });

      $urlRouterProvider.otherwise(function ($injector, $location) {
        var state = $injector.get("$state");
        state.go("404");
        return $location.path();
      });
   })
  .run(function ($rootScope, $state) {
    angular.element(document).on("click", function(e) {
      $rootScope.$broadcast("documentClicked", angular.element(e.target));
    });

    $rootScope.$state = $state;
  });

  angular.bootstrap(document, ["myApp"]);

})();

