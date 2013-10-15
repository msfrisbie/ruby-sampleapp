'use strict';

window.angular.module('Outhouse.events.service', [])
  .factory('Events', function($resource) {
    var r1 = $resource('/events/:id.json'),
        r2 = $resource('/events/c/:category.json');

    r1.getByCategory = r2.query.bind(r2);
    
    return r1;
    // return $resource(
    //   // '/events/c/:category.json'//,
    //   '/events/:id.json'//,
    //   // {
    //   //   update: { method: 'PUT' }
    //   // }
    // )
  })
