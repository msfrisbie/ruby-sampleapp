window.angular.module('Outhouse.events.controller', ['Outhouse.events.service', 'Outhouse.events.filter', 'truncate'])
  .controller('EventsController', ['$scope', '$rootScope', '$routeParams', '$location', 'Events',
    function($scope, $rootScope, $routeParams, $location, Events) {

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

      $scope.category = $routeParams.category;
      $scope.activity = $routeParams.activity;

      $scope.findByCategory = function () {
        Events.getByCategory({category: $scope.activity, time: $routeParams.time}, function (events) {
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