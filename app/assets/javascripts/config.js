'use strict';

window.app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/',                              { templateUrl: 'main.html' })
      .when('/:category',                     { templateUrl: 'categories.html' })
      .when('/:category/:activity',           { templateUrl: 'list.html' })
      .when('/:category/:activity/:eventId',  { templateUrl: 'page.html' })
      .otherwise({ redirectTo: '/' });
  }]);

// window.app.config(['$httpProvider', function($httpProvider, Configuration) {
//     delete $httpProvider.defaults.headers.common["X-Requested-With"];
//     $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
// }]);

window.angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/timepicker/timepicker.html",
    "JAKE");
}]);
