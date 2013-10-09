'use strict';

angular.module('eventApp', [])
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      $locationProvider.html5Mode(true);

      $routeProvider
        .when('/', {
          templateUrl: 'main.html',
          controller: 'MainCtrl'
        })
        .when('/page', {
          templateUrl: 'page.html',
          controller: 'MainCtrl'
        })
        .when('/categories', {
          templateUrl: 'categories.html',
          controller: 'MainCtrl'
        })
        .when('/list', {
          templateUrl: 'list.html',
          controller: 'MainCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
    }]);
