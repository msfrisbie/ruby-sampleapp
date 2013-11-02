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
        // gaussian, doesnt work yet
        // $rootScope.opacity.val = (1/(6.28*0.25))*Math.exp(-Math.pow((((hour+(min/60))-12)*(5/12)),2)/(0.5));
      })

      if (!$routeParams.time) {
        $scope.mytime = new Date();
      } else {
        $scope.mytime = new Date(parseInt($routeParams.time)*1000);
      }

      $scope.unixtime = Math.round($scope.mytime.getTime()/1000);

      // if (!!$routeParams.category) {
      //   $scope.category = $scope.categories[$routeParams.category];
      // }
      // $scope.subcategory = $scope.category.subcategories[$routeParams.subcategory];

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


      $scope.findCategories = function() {
        $scope.categories = Categories.getAllCategories();
        
        if (!!$routeParams.category) {
          $scope.category = $scope.categories[$routeParams.category];
        }
        // $scope.categories = Categories.getActiveCategories($scope.category,$scope.subcategory)

        // if($routeParams.subcategory){
        //   $scope.categories = Categories.getActiveCats($routeParams.subcategory.toLowerCase());
        // } else if($routeParams.category){
        //   $scope.categories = Categories.getActiveCats($routeParams.category.toLowerCase());
        // } else {
        //   $scope.categories = Categories.getActiveCats("root");
        // }
      };

      // $scope.categories = [];

      // $scope.find = function (query) {
      //   Categories.query(query, function (categories) {
      //     $scope.categories = categories;
      //   });
      // };
    }])