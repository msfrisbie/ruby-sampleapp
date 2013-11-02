'use strict';

window.app.config(['$routeProvider',
  function ($routeProvider) {
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

// Needed in order for links to work on Android.
window.app.config(['$compileProvider', '$httpProvider',
  function($compileProvider, $httpProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|content):/);

    // $httpProvider.defaults.useXDomain = true;
    // delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }]);
