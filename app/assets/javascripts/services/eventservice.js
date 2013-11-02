'use strict';

window.angular.module('Outhouse.events.service', [])
  .factory('Events', ['$resource', 
    function($resource) {
      var r1 = $resource('http://getouthouse.herokuapp.com/events/:id.json'),
          r2 = $resource('http://getouthouse.herokuapp.com/events/c/:category.json');

      r1.getByCategory = r2.query.bind(r2);

      return r1;
    }])
