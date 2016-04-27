(function () {
  "use strict";

  var GoogleMapController = function () {

  };

  var googleMap = function () {
    return {
      restrict: "A",
      controller: GoogleMapController,
      controllerAs: "googleMapCtrl",
      link: function (scope, element, attrs) {
        var map;

        var initialize = function () {
          var mapOptions = {
            zoom: 8,
            center: new google.maps.LatLng(48.8568980, 2.5283730),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          map = new google.maps.Map(element[0], mapOptions);
        }

        initialize();
      }
    }
  };

  module.exports = {
    name: "googleMap",
    fn: googleMap
  }

})();
