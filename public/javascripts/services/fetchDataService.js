;(function() {
  "use strict";

  require("angular");

  var fetchData = function ($http, $q) {

    /**
     * [getOnboardingData description]
     * @param  {[type]} url [description]
     * @return {[type]}     [description]
     */
    var fetch = function (url) {
      var deferred = $q.defer();

      $http.get(url)
      .error(function (data, status, header, config) {
        deferred.reject("An error occured while fetching data");
      })
      .then(function (response) {
        deferred.resolve(response.data);
      });

      return deferred.promise;
    };

    return {
      fetch: fetch
    };

  };

  module.exports = {
    name: "fetchData",
    fn: fetchData
  }

})();
