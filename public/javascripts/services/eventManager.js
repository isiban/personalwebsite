;(function() {
  "use strict";

  /**
   * [eventManager description]
   * @param  {[type]} $rootScope [description]
   * @return {[type]}            [description]
   */
  var eventManager = function ($rootScope) {
    var _events = {
      selectPortfolio: "SELECT_PORTFOLIO",
      localeUpdated: "LOCALE_UPDATED"
    },
    _eventsOpts = {};

    var fireEvent = function (eventName, opts) {
      if (!_events.hasOwnProperty(eventName)) {
        return false;
      }

      _eventsOpts[eventName] = opts;

      $rootScope.$broadcast(_events[eventName]);
      return true;
    };


    var subscribeToEvent = function (scope, eventName, handler) {
      if (!_events[eventName]) {
        return false;
      }

      scope.$on(_events[eventName], function () {
        handler(angular.copy(_eventsOpts[eventName]));
        delete _eventsOpts[eventName];
      });
      return true;
    };

    return {
      fireEvent: fireEvent,
      subscribeToEvent: subscribeToEvent
    };

  };

  module.exports = {
    name: "eventManager",
    fn: eventManager
  };

})();
