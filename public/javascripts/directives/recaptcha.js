(function () {
  "use strict";

  var ReCaptchaController = function ($scope, eventManager, $translate) {

    // console.log($scope);

    // eventManager.subscribeToEvent($scope, "localeUpdated", function (opts) {
    //   document.querySelector('.g-recaptcha').innerHTML = '';

    //   var script = document.createElement('script');
    //   script.src = "https://www.google.com/recaptcha/api.js?sitekey=6LcdbB4TAAAAALW6p8PrYG-FHmG5z7xeYstBxX-C&hl=" + $translate.use();
    //   script.async = true;
    //   script.defer = true;
    //   document.querySelector('body').appendChild(script);
    // });

  };

  var reCaptcha = function () {
    return {
      restrict: "A",
      controller: ReCaptchaController,
      controllerAs: "reCaptchaCtrl",
      require: "ngModel",
      link: function (scope, element, attrs, ngModel) {
        var widgetId;

        function update (response) {
          ngModel.$setViewValue(response);
          ngModel.$render();
        };

        function expired () {
          grecaptcha.reset(id);
          ngModel.$setViewValue("");
          ngModel.$render();
        };

        function iscaptchaReady () {
          if (typeof grecaptcha !== "object") {
            return setTimeout(iscaptchaReady, 250);
          }

          widgetId = grecaptcha.render(
            element[0], {
              "sitekey": "6LcdbB4TAAAAALW6p8PrYG-FHmG5z7xeYstBxX-C",
              callback: update,
              "expired-callback": expired
          });
        }


        iscaptchaReady();
      }
    }
  };

  module.exports = {
    name: "reCaptcha",
    fn: reCaptcha
  }

})();
