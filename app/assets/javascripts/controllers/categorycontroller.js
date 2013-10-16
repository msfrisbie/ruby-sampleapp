window.angular.module('Outhouse.categories.controller', ['Outhouse.categories.service'])
  .controller('CategoriesController', 
    function($scope, $routeParams, $location, Categories) {

      $scope.mytime = new Date();
      $scope.unixtime = Math.round($scope.mytime.getTime()/1000);

      $scope.hstep = 1;
      $scope.mstep = 15;

      $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
      };

      $scope.ismeridian = true;
      $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
      };

      $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
      };

      $scope.changed = function () {
        console.log('Time changed to: ' + Math.round($scope.mytime.getTime()/1000));
        $scope.unixtime = Math.round($scope.mytime.getTime()/1000);
      };

      $scope.clear = function() {
        $scope.mytime = null;
      };

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
          "title": "Farms"
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