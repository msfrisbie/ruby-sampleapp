window.angular.module('Outhouse.events.controller', ['Outhouse.events.service'])
  .controller('EventsController', 
    function($scope, $routeParams, $location, Events) {
      $scope.find = function (query) {
        Events.query(query, function (events) {
          $scope.events = events;
        });
      };
    })