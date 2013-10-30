'use strict';

window.angular.module('Outhouse.facebook.controller', [])
  .controller('FacebookController', [
    '$scope',
    '$timeout',
    'Facebook',
    function($scope, $timeout, Facebook) {
      
      // Define user empty data :/
      if (!$scope.user) {
        $scope.user = {};
      }
      
      // Defining user logged status
      if (!$scope.logged) {
        $scope.logged = false;
      }
      // } else if ($scope.logged) {
      //   $scope.login();
      // }
      
      // And some fancy flags to display messages upon user status change
      $scope.byebye = false;
      $scope.salutation = false;
      
      /**
       * Watch for Facebook to be ready.
       * There's also the event that could be used
       */
      $scope.$watch(
        function() {
          return Facebook.isReady();
        },
        function(newVal) {
          if (newVal) {
            $scope.facebookReady = true;
            $scope.initLogin()
          }

        }
      );
      
      /**
       * IntentLogin
       */
      $scope.IntentLogin = function() {
        Facebook.getLoginStatus(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.me(); 
          }
          else
            $scope.login();
        });
      };
      
      $scope.logStatus = function() {
        Facebook.getLoginStatus(function(response) {
            console.log('resp',response)
        })
      }

      $scope.sendMessage = function() {
        Facebook.ui({
          method: 'send',
          to: '100002541791520', //<img src="http://graph.facebook.com/100002541791520/picture">
          link: 'getouthouse.herokuapp.com',
          // redirect_uri: "http://getouthouse.herokuapp.com/login"
          display: 'page'
          // description: 'desc'//,
          // message: 'message123123123',
          // data: 'tracking information for the user'
        })
      }

      $scope.initLogin = function() {
        Facebook.getLoginStatus(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.me(); 
          }
        });
      }

      /**
       * Login
       */
       $scope.login = function() {
         Facebook.login(function(response) {
          if (response.status == 'connected') {
            $scope.logged = true;
            $scope.me();
          }
        
        });
       };
       
       /**
        * me 
        */
        $scope.me = function() {
          Facebook.api('/me', function(response) {
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function() {
              $scope.user = response;
            });
            
          });
        };
      
        $scope.friends = function() {
            Facebook.api('/me/friends', function(response) {
                $scope.$apply(function() {
                    $scope.friends = response;
                })
            })
        }

      /**
       * Logout
       */
      $scope.logout = function() {
        Facebook.logout(function() {
          $scope.$apply(function() {
            $scope.user   = {};
            $scope.logged = false;  
          });
        });
      }
      
      /**
       * Taking approach of Events :D
       */
      $scope.$on('Facebook:statusChange', function(ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
          $scope.$apply(function() {
            $scope.salutation = true;
            $scope.byebye     = false;    
          });
        } else {
          $scope.$apply(function() {
            $scope.salutation = false;
            $scope.byebye     = true;
            
            // Dismiss byebye message after two seconds
            $timeout(function() {
              $scope.byebye = false;
            }, 2000)
          });
        }
        
        
      });
      
      
    }
  ])