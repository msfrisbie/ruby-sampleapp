window.angular.module('Outhouse.events.controller', ['Outhouse.events.service'])
  .controller('EventsController', 
    function($scope, $routeParams, $location, Events) {

      console.log($routeParams.category)

      $scope.category = $routeParams.category;

      $scope.find = function () {
        Events.query({category: $scope.category}, function (events) {
          $scope.events = events;
          console.log(events);
        })
      };

      // $scope.find = function (query) {
      //   Events.query(query, function (events) {
      //     $scope.events = events;
      //   });
      // };
    })