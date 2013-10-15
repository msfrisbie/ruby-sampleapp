'use strict';

window.angular.module('Outhouse.categories.service', [])
  .factory('Categories', function($resource) {
    return $resource(
      'categories/:categoryId',
      {
        update: { method: 'PUT' }
      }
    )
  })
