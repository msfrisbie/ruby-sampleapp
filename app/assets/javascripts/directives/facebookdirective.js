'use strict';

window.angular.module('Outhouse.facebook.directive', [])
  .directive('debug', function() {
    return {
      restrict: 'E',
      scope: {
        expression: '=val'
      },
      template: '<pre>{{debug(expression)}}</pre>',
      link: function(scope) {
        // pretty-prints
        scope.debug = function(exp) {
          return angular.toJson(exp, true);
        };
      }
    }
  })