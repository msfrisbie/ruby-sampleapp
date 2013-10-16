window.angular.module('Outhouse.events.controller', ['Outhouse.events.service'])
  .controller('EventsController', 
    function($scope, $routeParams, $location, Events) {

      // console.log($routeParams.category)

      $scope.category = $routeParams.category;

      $scope.findByCategory = function () {
        Events.getByCategory({category: $scope.category, time: $routeParams.time}, function (events) {
          $scope.events = events;
          console.log(events);
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
    })