(function () {
  "use strict";

  var GoogleMapController = function () {
    // API key: AIzaSyAY-KI9MJdTbvBXmBcU4KUuz8JG4fKH9Jo
  };

  var googleMap = function () {
    return {
      restrict: "A",
      controller: GoogleMapController,
      controllerAs: "googleMapCtrl",
      link: function () {

      }
    }
  };

  module.exports = {
    name: "googleMap",
    fn: googleMap
  }

})();
