'use strict';

window.angular.module('Outhouse.categories.service', [])
  .factory('Categories', ['$resource', function($resource) {
    return $resource(
      'categories/:categoryId',
      {
        update: { method: 'PUT' }
      }
    )
  }])
