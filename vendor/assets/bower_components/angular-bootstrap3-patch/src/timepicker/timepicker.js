angular.module('ui.bootstrap.timepicker', [])

.constant('timepickerConfig', {
  hourStep: 1,
  minuteStep: 1,
  showMeridian: true,
  meridians: ['AM', 'PM'],
  readonlyInput: false,
  mousewheel: true
})

.directive('timepicker', ['$parse', '$log', 'timepickerConfig', function ($parse, $log, timepickerConfig) {
  return {
    restrict: 'EA',
    require:'?^ngModel',
    replace: true,
    scope: {},
    // templateUrl: 'template/timepicker/timepicker.html',
    template: " <span>" +
              "     <div class=\"row\">" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-1 text-center\">" +
              "         </div>" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-3 text-center\">" +
              "             <a ng-click=\"incrementHours()\" class=\"btn btn-link\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>" +
              "         </div>" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-3 text-center\">" +
              "             <a ng-click=\"incrementMinutes()\" class=\"btn btn-link\"><i class=\"glyphicon glyphicon-chevron-up\"></i></a>" +
              "         </div>" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-3\"> </div>" +
              "     </div>" +
              "     <div class=\"row\">" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-1 text-center\">" +
              "         </div>" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-3\">" +
              "             <div class=\"form-group\" ng-class=\"{'has-error': invalidHours}\" style=\"margin-bottom: 0px\">" +
              "                 <input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-mousewheel=\"incrementHours()\" ng-readonly=\"readonlyInput\" maxlength=\"2\"> " +
              "             </div>" +
              "         </div>" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-3\">" +
              "             <div class=\"form-group\" ng-class=\"{'has-error': invalidMinutes}\" style=\"margin-bottom: 0px\">" +
              "                 <span style='position:absolute;margin-left:-7px'>:</span>" +
              "                 <input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-mousewheel=\"incrementMinutes()\" ng-readonly=\"readonlyInput\" maxlength=\"2\"> " +
              "             </div>" +
              "         </div>" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-3\">" +
              "             <button style=\"vertical-align:top\" ng-click=\"toggleMeridian()\" class=\"btn btn-default text-center\" ng-show=\"showMeridian\">{{meridian}}</button>" +
              "         </div>" +
              "     </div>" +
              "     <div class=\"row\">" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-1 text-center\">" +
              "         </div>" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-3 text-center\">" +
              "             <a ng-click=\"decrementHours()\" class=\"btn btn-link\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>" +
              "         </div>" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-3 text-center\">" +
              "             <a ng-click=\"decrementMinutes()\" class=\"btn btn-link\"><i class=\"glyphicon glyphicon-chevron-down\"></i></a>" +
              "         </div>" +
              "         <div style=\"padding-left:5px; padding-right:5px\" class=\"col-xs-3\"> </div>" +
              "     </div>" +
              " </span>",


    link: function(scope, element, attrs, ngModel) {
      if ( !ngModel ) {
        return; // do nothing if no ng-model
      }

      var selected = new Date(), meridians = timepickerConfig.meridians;

      var hourStep = timepickerConfig.hourStep;
      if (attrs.hourStep) {
        scope.$parent.$watch($parse(attrs.hourStep), function(value) {
          hourStep = parseInt(value, 10);
        });
      }

      var minuteStep = timepickerConfig.minuteStep;
      if (attrs.minuteStep) {
        scope.$parent.$watch($parse(attrs.minuteStep), function(value) {
          minuteStep = parseInt(value, 10);
        });
      }

      // 12H / 24H mode
      scope.showMeridian = timepickerConfig.showMeridian;
      if (attrs.showMeridian) {
        scope.$parent.$watch($parse(attrs.showMeridian), function(value) {
          scope.showMeridian = !!value;

          if ( ngModel.$error.time ) {
            // Evaluate from template
            var hours = getHoursFromTemplate(), minutes = getMinutesFromTemplate();
            if (angular.isDefined( hours ) && angular.isDefined( minutes )) {
              selected.setHours( hours );
              refresh();
            }
          } else {
            updateTemplate();
          }
        });
      }

      // Get scope.hours in 24H mode if valid
      function getHoursFromTemplate ( ) {
        var hours = parseInt( scope.hours, 10 );
        var valid = ( scope.showMeridian ) ? (hours > 0 && hours < 13) : (hours >= 0 && hours < 24);
        if ( !valid ) {
          return undefined;
        }

        if ( scope.showMeridian ) {
          if ( hours === 12 ) {
            hours = 0;
          }
          if ( scope.meridian === meridians[1] ) {
            hours = hours + 12;
          }
        }
        return hours;
      }

      function getMinutesFromTemplate() {
        var minutes = parseInt(scope.minutes, 10);
        return ( minutes >= 0 && minutes < 60 ) ? minutes : undefined;
      }

      function pad( value ) {
        return ( angular.isDefined(value) && value.toString().length < 2 ) ? '0' + value : value;
      }

      // Input elements
      var inputs = element.find('input'), hoursInputEl = inputs.eq(0), minutesInputEl = inputs.eq(1);

      // Respond on mousewheel spin
      var mousewheel = (angular.isDefined(attrs.mousewheel)) ? scope.$eval(attrs.mousewheel) : timepickerConfig.mousewheel;
      if ( mousewheel ) {

        var isScrollingUp = function(e) {
          if (e.originalEvent) {
            e = e.originalEvent;
          }
          //pick correct delta variable depending on event
          var delta = (e.wheelDelta) ? e.wheelDelta : -e.deltaY;
          return (e.detail || delta > 0);
        };

        hoursInputEl.bind('mousewheel wheel', function(e) {
          scope.$apply( (isScrollingUp(e)) ? scope.incrementHours() : scope.decrementHours() );
          e.preventDefault();
        });

        minutesInputEl.bind('mousewheel wheel', function(e) {
          scope.$apply( (isScrollingUp(e)) ? scope.incrementMinutes() : scope.decrementMinutes() );
          e.preventDefault();
        });
      }

      scope.readonlyInput = (angular.isDefined(attrs.readonlyInput)) ? scope.$eval(attrs.readonlyInput) : timepickerConfig.readonlyInput;
      if ( ! scope.readonlyInput ) {

        var invalidate = function(invalidHours, invalidMinutes) {
          ngModel.$setViewValue( null );
          ngModel.$setValidity('time', false);
          if (angular.isDefined(invalidHours)) {
            scope.invalidHours = invalidHours;
          }
          if (angular.isDefined(invalidMinutes)) {
            scope.invalidMinutes = invalidMinutes;
          }
        };

        scope.updateHours = function() {
          var hours = getHoursFromTemplate();

          if ( angular.isDefined(hours) ) {
            selected.setHours( hours );
            refresh( 'h' );
          } else {
            invalidate(true);
          }
        };

        hoursInputEl.bind('blur', function(e) {
          if ( !scope.validHours && scope.hours < 10) {
            scope.$apply( function() {
              scope.hours = pad( scope.hours );
            });
          }
        });

        scope.updateMinutes = function() {
          var minutes = getMinutesFromTemplate();

          if ( angular.isDefined(minutes) ) {
            selected.setMinutes( minutes );
            refresh( 'm' );
          } else {
            invalidate(undefined, true);
          }
        };

        minutesInputEl.bind('blur', function(e) {
          if ( !scope.invalidMinutes && scope.minutes < 10 ) {
            scope.$apply( function() {
              scope.minutes = pad( scope.minutes );
            });
          }
        });
      } else {
        scope.updateHours = angular.noop;
        scope.updateMinutes = angular.noop;
      }

      ngModel.$render = function() {
        var date = ngModel.$modelValue ? new Date( ngModel.$modelValue ) : null;

        if ( isNaN(date) ) {
          ngModel.$setValidity('time', false);
          $log.error('Timepicker directive: "ng-model" value must be a Date object, a number of milliseconds since 01.01.1970 or a string representing an RFC2822 or ISO 8601 date.');
        } else {
          if ( date ) {
            selected = date;
          }
          makeValid();
          updateTemplate();
        }
      };

      // Call internally when we know that model is valid.
      function refresh( keyboardChange ) {
        makeValid();
        ngModel.$setViewValue( new Date(selected) );
        updateTemplate( keyboardChange );
      }

      function makeValid() {
        ngModel.$setValidity('time', true);
        scope.invalidHours = false;
        scope.invalidMinutes = false;
      }

      function updateTemplate( keyboardChange ) {
        var hours = selected.getHours(), minutes = selected.getMinutes();

        if ( scope.showMeridian ) {
          hours = ( hours === 0 || hours === 12 ) ? 12 : hours % 12; // Convert 24 to 12 hour system
        }
        scope.hours =  keyboardChange === 'h' ? hours : pad(hours);
        scope.minutes = keyboardChange === 'm' ? minutes : pad(minutes);
        scope.meridian = selected.getHours() < 12 ? meridians[0] : meridians[1];
      }

      function addMinutes( minutes ) {
        // var dt = new Date( selected.getTime() + minutes * 60000 );
        var dt = new Date( selected.getTime() + minutes * 60000 );
        selected.setHours( dt.getHours(), dt.getMinutes() );
        refresh();
      }

      scope.incrementHours = function() {
        addMinutes( hourStep * 60 );
      };
      scope.decrementHours = function() {
        addMinutes( - hourStep * 60 );
      };
      scope.incrementMinutes = function() {
        addMinutes( minuteStep );
      };
      scope.decrementMinutes = function() {
        addMinutes( - minuteStep );
      };
      scope.toggleMeridian = function() {
        addMinutes( 12 * 60 * (( selected.getHours() < 12 ) ? 1 : -1) );
      };
    }
  };
}]);
