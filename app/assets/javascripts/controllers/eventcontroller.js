window.angular.module('Outhouse.events.controller', ['Outhouse.events.service', 'Outhouse.events.filter', 'truncate'])
  .controller('EventsController', ['$scope', '$rootScope', '$routeParams', '$location', 'Events', 'Categories',
    function($scope, $rootScope, $routeParams, $location, Events, Categories) {

      $scope.loaderVisible = true;

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

      $scope.unixtime = $routeParams.time;

      $scope.category = Categories.getAllCategories()[$routeParams.category];
      $scope.subcategory = $scope.category.subcategories[$routeParams.subcategory];

      // $scope.subcategory = Categories.getAllCategories()[$scope.category].subcategories[$scope.subcategory];


      $scope.findByCategory = function () {
        Events.getByCategory({category: $scope.subcategory, time: $routeParams.time}, function (events) {
          $scope.events = events;
          $scope.loaderVisible = false;
        })
      };

      $scope.findOne = function () {
        Events.get({id: $routeParams.eventId}, function (event) {
          $scope.event = event;
          $scope.loaderVisible = false;
        })
      };

      // $scope.find = function (query) {
      //   Events.query(query, function (events) {
      //     $scope.events = events;
      //   });
      // };
    }])