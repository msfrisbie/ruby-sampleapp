'use strict';

window.angular.module('Outhouse.events.filter', [])
  .filter('relevantTimeRangeString', function() {
    return function(input) {
      // return 'it worked!'+input;
      return new Date(input*1000).toLocaleTimeString();
    }
  })