window.angular.module('Outhouse.categories.controller', ['Outhouse.categories.service'])
  .controller('CategoriesController', 
    function($scope, $routeParams, $location, Categories) {

      $scope.categories = [
        {
          "url": "",
          "title": "Sports"
        },
        {
          "url": "",
          "title": "Soccer"
        },
        {
          "url": "",
          "title": "Football"
        },
        {
          "url": "",
          "title": "Exercise"
        },
        {
          "url": "",
          "title": "Yoga"
        },
        {
          "url": "",
         "title": "Yoga Jake"
        }
      ]

      $scope.find = function (query) {
        Categories.query(query, function (categories) {
          $scope.categories = categories;
        });
      };
    })