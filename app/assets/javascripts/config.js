'use strict';

window.app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'CategoriesController'
      })
      .when('/page', {
        templateUrl: 'page.html',
        controller: 'EventsController'
      })
      .when('/categories', {
        templateUrl: 'categories.html',
        controller: 'CategoriesController'
      })
      .when('/list', {
        templateUrl: 'list.html',
        controller: 'EventsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);