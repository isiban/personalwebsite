;(function() {
  "use strict";

  /**
   * [fetchData description]
   * @param  {[type]} $http [description]
   * @param  {[type]} $q    [description]
   * @return {[type]}       [description]
   */
  var mailContact = function ($http, $q, $httpParamSerializerJQLike) {

    /**
     * [send description]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    var send = function (params) {
      var deferred = $q.defer();

      $http({
        url: "api/contact",
        method: "POST",
        data: $httpParamSerializerJQLike(params),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .error(function (data, status, header, config) {
        deferred.reject("An error occured while fetching data");
      })
      .then(function (response) {
        deferred.resolve(response.data);
      });

      return deferred.promise;
    };

    return {
      send: send
    };

  };

  module.exports = {
    name: "mailContact",
    fn: mailContact
  }

})();
