window.angular.module('Outhouse.categories.controller', ['Outhouse.categories.service'])
  .controller('CategoriesController', 
    function($scope, $routeParams, $location, Categories) {
      $scope.find = function (query) {
        Categories.query(query, function (categories) {
          $scope.categories = categories;
        });
      };
    })