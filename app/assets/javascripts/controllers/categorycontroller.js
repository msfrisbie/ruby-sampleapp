window.angular.module('Outhouse.categories.controller', ['Outhouse.categories.service'])
  .controller('CategoriesController', ['$scope', '$timeout', '$routeParams', '$location', 'Categories',
    function($scope, $timeout, $routeParams, $location, Categories) {

      // date
      $scope.$parent.opacity = {'val':0};
      $scope.constop = 1;

      $scope.datevisible = false;

      $scope.datestr = function() {
        var str = "",
            year = new Date().getFullYear(),
            month = (new Date().getMonth()+1).toString(),
            day = new Date().getDate().toString();
        str = year + "-";
        if (month.length<2) {
          str += "0";
        }
        str += month+"-";
        if (day.length<2) {
          str += "0";
        }
        str += day;

        return str
        //((new Date().getFullYear())+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()))//"2013-10-01";//(new Date().getFullYear())+"-"+(new Date().getMonth())+"-"+(new Date().getDate());
      }

      // $scope.$watch('mytime',function() {
        
      // }) = 

      $scope.date = new Date();//(new Date().getFullYear())+"-"+(new Date().getMonth())+"-"+(new Date().getDate());

      // console.log((new Date().getFullYear())+"-"+(new Date().getMonth()+1)+"-"+(new Date().getDate()))

      $scope.setDate = function() {

        var data = $scope.date;

        if (data.toString().length==10) {
        var arr = data.toString().split('-');
          var year = parseInt(arr[0]),//$scope.date.getFullYear(),
              month = parseInt(arr[1])-1,//$scope.date.getMonth(),
              day = parseInt(arr[2]);//$scope.date.getDate();  
        } else {
          // console.log(data.toString().length)
          var year = $scope.date.getFullYear(),
              month = $scope.date.getMonth(),
              day = $scope.date.getDate();
        }
        $scope.mytime.setDate(day);
        $scope.mytime.setMonth(month);
        $scope.mytime.setFullYear(year);

        // console.log('jake',$scope.date.getDate())
        // console.log('jakey',$scope.date.toISOString());

        // var year = $scope.date.getFullYear(),
        //     month = $scope.date.getMonth(),
        //     day = $scope.date.getDate();

        // // var arr = $scope.date.split('-');
        // $scope.mytime.setDate(day);
        // $scope.mytime.setMonth(month);
        // $scope.mytime.setFullYear(year);
        // $scope.mytime.setDate($scope.date.getDate());
        // $scope.mytime.setMonth($scope.date.getMonth());
        // $scope.mytime.setFullYear($scope.date.getFullYear());
        // console.log($scope.mytime)
      }

      $scope.$watch('mytime', function(data) {
        $scope.setDate();
        // $scope.opacity = 
        var min = data.getMinutes();
        var hour = data.getHours();
        $scope.opacity.val = Math.abs(((hour+(min/60))-12)/12);
        $scope.constop = 1;
        // console.log('min',data.getMinutes());
        // console.log('min',data.getHours());
      })

      $scope.$watch('date', function(data) {

        $scope.setDate();

        // // console.log(data.toString());
        // // console.log(arr);
        // // console.log(data);
        // if (data.toString().length==10) {
        // var arr = data.toString().split('-');
        //   var year = parseInt(arr[0]),//$scope.date.getFullYear(),
        //       month = parseInt(arr[1])-1,//$scope.date.getMonth(),
        //       day = parseInt(arr[2]);//$scope.date.getDate();  
        // } else {
        //   // console.log(data.toString().length)
        //   var year = $scope.date.getFullYear(),
        //       month = $scope.date.getMonth(),
        //       day = $scope.date.getDate();
        // }
        // $scope.mytime.setDate(day);
        // $scope.mytime.setMonth(month);
        // $scope.mytime.setFullYear(year);
        // // $scope.setDate();
        // // console.log('setdate');
        // // console.log($scope.mytime)
      })

      // time

      if (!$routeParams.time) {
        $scope.mytime = new Date();
      } else {
        $scope.mytime = new Date(parseInt($routeParams.time)*1000);
      }

      $scope.unixtime = Math.round($scope.mytime.getTime()/1000);

      $scope.hstep = 1;
      $scope.mstep = 15;

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
        console.log('Time changed to: ' + Math.round($scope.mytime.getTime()/1000));
        $scope.unixtime = Math.round($scope.mytime.getTime()/1000);
      };

      $scope.clear = function() {
        $scope.mytime = null;
      };

      $scope.categories = [
        {
          "val": "Good Eats",
          "title": "Food"
        },
        {
          "val": "Going Shopping",
          "title": "Shopping"
        },
        {
          "val": "Getting Outside",
          "title": "Parks"
        },
        // {
        //   "val": "",
        //   "title": "Drinks"
        // },
        // {
        //   "val": "Art (DELETE)",
        //   "title": "Art"
        // },
        // {
        //   "val": "",
        //   "title": "Pizza"
        // },
        // {
        //   "val": "",
        //  "title": "Cafe"
        // },
        // {
        //   "val": "",
        //  "title": "Music"
        // },
        {
          "val": "Haunted Houses",
         "title": "Haunted House"
        },
        {
          "val": "Berkeley Lectures",
         "title": "Lecture"
        },
        {
          "val": "Quiet Study",
         "title": "Study"
        }
      ]

      $scope.find = function (query) {
        Categories.query(query, function (categories) {
          $scope.categories = categories;
        });
      };
    }])