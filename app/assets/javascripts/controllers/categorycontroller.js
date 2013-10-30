window.angular.module('Outhouse.categories.controller', ['Outhouse.categories.service'])
  .controller('CategoriesController', ['$scope', '$rootScope', '$timeout', '$routeParams', '$location', 'Categories',
    function($scope, $rootScope, $timeout, $routeParams, $location, Categories) {

      if (!$rootScope.opacity) {
        $rootScope.opacity = {'val':0};
      }

      $scope.$watch('mytime', function(data) {
        var min = data.getMinutes();
        var hour = data.getHours();
        $rootScope.opacity.val = Math.abs(((hour+(min/60))-12)/24);
      })

      if (!$routeParams.time) {
        $scope.mytime = new Date();
      } else {
        $scope.mytime = new Date(parseInt($routeParams.time)*1000);
      }

      $scope.unixtime = Math.round($scope.mytime.getTime()/1000);

      $scope.category = $routeParams.category;
      $scope.activity = $routeParams.activity;

      $scope.hstep = 1;
      $scope.mstep = 30;

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
        // console.log('Time changed to: ' + Math.round($scope.mytime.getTime()/1000));
        $scope.unixtime = Math.round($scope.mytime.getTime()/1000);
      };

      $scope.clear = function() {
        $scope.mytime = null;
      };


      $scope.findCategories = function(){
        if($routeParams.activity){
          $scope.categories = Categories.getActiveCats($routeParams.activity.toLowerCase());
        } else if($routeParams.category){
          $scope.categories = Categories.getActiveCats($routeParams.category.toLowerCase());
        } else {
          $scope.categories = Categories.getActiveCats("root");
        }
      };

      $scope.categories = [];

      $scope.find = function (query) {
        Categories.query(query, function (categories) {
          $scope.categories = categories;
        });
      };
    }])