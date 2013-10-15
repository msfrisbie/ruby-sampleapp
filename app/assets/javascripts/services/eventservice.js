'use strict';

window.angular.module('Outhouse.events.service', [])
  .factory('Events', function($resource) {
    return $resource(
      'events/:eventId',
      {
        update: { method: 'PUT' }
      }
    )
  })
