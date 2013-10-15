'use strict';

window.app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'CategoriesController'
      })
      // .when('/page', {
      //   templateUrl: 'page.html',
      //   controller: 'EventsController'
      // })
      .when('/categories', {
        templateUrl: 'categories.html',
        controller: 'CategoriesController'
      })
      .when('/categories/:category', {
        templateUrl: 'list.html',
        controller: 'EventsController'
      })
      .when('/categories/:category/:eventId', {
        templateUrl: 'page.html',
        controller: 'EventsController'
      })
      // .when('/list', {
      //   templateUrl: 'list.html',
      //   controller: 'EventsController'
      // })
      .otherwise({
        redirectTo: '/'
      });
  }]);

// window.app.config(['$httpProvider', function($httpProvider, Configuration) {
//     delete $httpProvider.defaults.headers.common["X-Requested-With"];
//     $httpProvider.defaults.headers.post["Content-Type"] = "application/json";
// }]);

window.angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/timepicker/timepicker.html",
    "JAKE");
}]);

// angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
//   $templateCache.put("template/timepicker/timepicker.html",
//     " <span>" +
//     "     <div class=\"row\">" +
//     "         <div class=\"col-xs-4 text-center\">" +
//     "             <a ng-click=\"incrementHours()\" class=\"btn btn-link\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>" +
//     "         </div>" +
//     "         <div class=\"col-xs-6 text-center\">" +
//     "             <a ng-click=\"incrementMinutes()\" class=\"btn btn-link\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>" +
//     "         </div>" +
//     "         <div class=\"col-xs-2\"> </div>" +
//     "     </div>" +
//     "     <div class=\"row\">" +
//     "         <div class=\"col-xs-4\">" +
//     "             <div class=\"form-group\" ng-class=\"{'has-error': invalidHours}\" style=\"margin-bottom: 0px\">" +
//     "                 <input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-mousewheel=\"incrementHours()\" ng-readonly=\"readonlyInput\" maxlength=\"2\"> " +
//     "             </div>" +
//     "         </div>" +
//     "         <div class=\"col-xs-6\">" +
//     "             <div class=\"input-group\" ng-class=\"{'has-error': invalidMinutes}\">" +
//     "                 <span class=\"input-group-addon\">:</span>" +
//     "                 <input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\">" +
//     "             </div>" +
//     "         </div>" +
//     "         <div class=\"col-xs-2\">" +
//     "             <button ng-click=\"toggleMeridian()\" class=\"btn btn-default text-center\" ng-show=\"showMeridian\">{{meridian}}</button>" +
//     "         </div>" +
//     "     </div>" +
//     "     <div class=\"row\">" +
//     "         <div class=\"col-xs-4 text-center\">" +
//     "             <a ng-click=\"decrementHours()\" class=\"btn btn-link\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>" +
//     "         </div>" +
//     "         <div class=\"col-xs-6 text-center\">" +
//     "             <a ng-click=\"decrementMinutes()\" class=\"btn btn-link\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>" +
//     "         </div>" +
//     "         <div class=\"col-xs-2\"> </div>" +
//     "     </div>" +
//     " </span>");
// }]);

// <span>
//     <div class="row">
//         <div class="col-xs-4 text-center">
//             <a ng-click="incrementHours()" class="btn btn-link"><i class="glyphicon glyphicon-chevron-up"></i></a>
//         </div>
//         <div class="col-xs-6 text-center">
//             <a ng-click="incrementMinutes()" class="btn btn-link"><i class="glyphicon glyphicon-chevron-up"></i></a>
//         </div>
//         <div class="col-xs-2"> </div>
//     </div>

//     <div class="row">
//         <div class="col-xs-4">
//             <div class="form-group" ng-class="{'has-error': invalidHours}" style="margin-bottom: 0px">
//                 <input type="text" ng-model="hours" ng-change="updateHours()" class="form-control text-center" ng-mousewheel="incrementHours()" ng-readonly="readonlyInput" maxlength="2"> 
//             </div>
//         </div>
//         <div class="col-xs-6">
//             <div class="input-group" ng-class="{'has-error': invalidMinutes}">
//                 <span class="input-group-addon">:</span>
//                 <input type="text" ng-model="minutes" ng-change="updateMinutes()" class="form-control text-center" ng-readonly="readonlyInput" maxlength="2">
//             </div>
//         </div>
//         <div class="col-xs-2">
//             <button ng-click="toggleMeridian()" class="btn btn-default text-center" ng-show="showMeridian">{{meridian}}</button>
//         </div>
//     </div>

//     <div class="row">
//         <div class="col-xs-4 text-center">
//             <a ng-click="decrementHours()" class="btn btn-link"><i class="glyphicon glyphicon-chevron-down"></i></a>
//         </div>
//         <div class="col-xs-6 text-center">
//             <a ng-click="decrementMinutes()" class="btn btn-link"><i class="glyphicon glyphicon-chevron-down"></i></a>
//         </div>
//         <div class="col-xs-2"> </div>
//     </div>
// </span>