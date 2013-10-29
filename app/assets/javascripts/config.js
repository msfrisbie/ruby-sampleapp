'use strict';

window.app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when('/',                              { templateUrl: 'main.html' })
      .when('/login',                         { templateUrl: 'login.html' })
      .when('/:category',                     { templateUrl: 'categories.html' })
      .when('/:category/:activity',           { templateUrl: 'list.html' })
      .when('/:category/:activity/:eventId',  { templateUrl: 'page.html' })
      .otherwise({ redirectTo: '/' });
  }]);

window.app.config(['FacebookProvider',
    function(FacebookProvider) {
      var myAppId = '180973258759990';

      // You can set appId with setApp method
      // FacebookProvider.setAppId('myAppId');

      /**
      * After setting appId you need to initialize the module.
      * You can pass the appId on the init method as a shortcut too.
      */
      FacebookProvider.init(myAppId);
     
    }
  ])