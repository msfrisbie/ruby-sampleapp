'use strict';

window.angular.module('Outhouse.events.service', [])
  .factory('Events', function($resource) {
    return $resource(
      '/events/c/:category'//,
      // {
      //   update: { method: 'PUT' }
      // }
    )
  })
