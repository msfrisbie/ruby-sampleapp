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
      .when('/events/:eventId', {
        templateUrl: 'page.html',
        controller: 'EventsController'
      })
      .when('/categories', {
        templateUrl: 'categories.html',
        controller: 'CategoriesController'
      })
      .when('/categories/:category', {
        templateUrl: 'list.html',
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