'use strict';

window.angular.module('Outhouse.events.filter', [])
  .filter('relevantTimeRangeString', function() {
    return function(event, setTime) {
      // return 'it worked!'+input;

      var isBetween = function(time,start,end) {
        return (time >= start && time <= end) ;
      }

      var dateFromUnix = function(unixtime) {
        return new Date(unixtime*1000);
      }

      if (!event) {
        return '';
      }

      var str = null;

      if (!setTime) {
        setTime = new Date().getTime()/1000;
      } 

      if (!event.time_ranges) {
        event.time_ranges = [];
      }

      // cannot be an empty array or this does not work!
      if (event.time_ranges.length>0) {
        // time ranges exist, this event is non-recurring
        event.time_ranges.forEach(function(range) {
          if (setTime >= range.start && setTime <= range.end) {
            str = ("" + 
                    new Date(range.start*1000).toLocaleTimeString() +
                    " - " + 
                    new Date(range.end*1000).toLocaleTimeString());
          }
        })
      } else {
        // this event recurs weekly
        if (!event.schedule.time_range) {
          event.schedule.time_range = [];
        }

        var dateSet = {
          "date": new Date(setTime*1000)
        };

        dateSet['base100'] = dateSet.date.getHours()*100 + dateSet.date.getMinutes();

        event.schedule[["sun","mon","tue","wed","thu","fri","sat"][dateSet.date.getDay()]].forEach(function(range) {
          if ((dateSet.base100 >= range.start 
              && dateSet.base100 <= range.end) 
            && ((event.schedule.time_range.length==0) 
              || (setTime >= event.schedule.time_range.start 
                && setTime <= event.schedule.time_range.end))) {
            str = "" + 
                  new Date(new Date(new Date(setTime*1000).setHours(range.start/100)).setMinutes((range.start%100))).toLocaleTimeString() +
                  " - " + 
                  new Date(new Date(new Date(setTime*1000).setHours(range.end/100)).setMinutes((range.end%100))).toLocaleTimeString() 
          }
        })
      }
      return str;
      console.log('This should never be reached!');
    }
  })
  .filter('stripSeconds', function() {
    return function(timeStr) {
      return timeStr.replace(/:\d\d\s/g," ");
    }
  })