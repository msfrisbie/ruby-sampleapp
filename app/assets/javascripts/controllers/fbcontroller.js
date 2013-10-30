'use strict';

window.angular.module('Outhouse.facebook.controller', [])
  .controller('FacebookController', [
    '$scope',
    '$timeout',
    'Facebook',
    '$location',
    function($scope, $timeout, Facebook, $location) {
      
    // console.log(navigator.userAgent)

    //   navigator.userAgent = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/28.0.1500.71 Chrome/28.0.1500.71 Safari/537.36 ggg";

    //   console.log(navigator.userAgent)

        // window.navigator.__defineGetter__('userAgent', function () {
        //     return "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/28.0.1500.71 Chrome/28.0.1500.71 Safari/537.36";//'Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206';
        // });

        // console.log(navigator.userAgent)

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
      
      $scope.gotofb = function() {
        window.navigator.__defineGetter__('userAgent', function () {
            return "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/28.0.1500.71 Chrome/28.0.1500.71 Safari/537.36";//'Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9B206';
        });
        // console.log('jake')
        // $location.absUrl("http://www.facebook.com/dialog/send?app_id=180973258759990&name=Get%20Outhouse&link=http://getouthouse.herokuapp.com&redirect_uri=http://getouthouse.herokuapp.com/login");
        window.location = "http://www.facebook.com/dialog/send?app_id=180973258759990&name=Get%20Outhouse&link=http://getouthouse.herokuapp.com&redirect_uri=http://getouthouse.herokuapp.com/login";
      }

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

      $scope.sendMessage = function(disp) {
        Facebook.ui({
          method: 'send',
          to: '100002541791520', //<img src="http://graph.facebook.com/100002541791520/picture">
          link: 'getouthouse.herokuapp.com',
          // redirect_uri: "http://getouthouse.herokuapp.com/login"
          display: disp
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