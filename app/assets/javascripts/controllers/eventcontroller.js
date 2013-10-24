window.angular.module('Outhouse.events.controller', ['Outhouse.events.service', 'Outhouse.events.filter', 'truncate'])
  .controller('EventsController', ['$scope', '$routeParams', '$location', 'Events',
    function($scope, $routeParams, $location, Events) {

      if (!$scope.$parent.opacity) {
        $scope.$parent.opacity = {'val':0};
      }

      // console.log($routeParams.category)
      $scope.$watch('mytime', function(data) {
        // $scope.setDate();
        // $scope.opacity = 
        var min = data.getMinutes();
        var hour = data.getHours();
        $scope.opacity.val = Math.abs(((hour+(min/60))-12)/24);
        $scope.constop = 1;
        // console.log('min',data.getMinutes());
        // console.log('min',data.getHours());
      })

      if (!$routeParams.time) {
        $scope.mytime = new Date();
      } else {
        $scope.mytime = new Date(parseInt($routeParams.time)*1000);
      }

      $scope.unixtime = $routeParams.time;

      $scope.category = $routeParams.category;

      $scope.findByCategory = function () {
        Events.getByCategory({category: $scope.category, time: $routeParams.time}, function (events) {
          $scope.events = events;
          // console.log(events);
        })
      };

      $scope.findOne = function () {
        Events.get({id: $routeParams.eventId}, function (event) {
          $scope.event = event;
          console.log(event);
        })
      };

      // $scope.find = function (query) {
      //   Events.query(query, function (events) {
      //     $scope.events = events;
      //   });
      // };
    }])