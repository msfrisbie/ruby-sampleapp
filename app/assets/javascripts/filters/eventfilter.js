'use strict';

window.angular.module('Outhouse.events.filter', [])
  .filter('relevantTimeRangeString', function() {
    return function(event, setTime) {
      // return 'it worked!'+input;

      var isBetween = function(time,range) { return (time >= range.start && time <= range.end) };

      var dateFromUnix = function(unixtime) { return new Date(unixtime*1000) };

      var dateString = function(time,rangeTime) { return new Date(new Date(dateFromUnix(time).setHours(rangeTime/100)).setMinutes((rangeTime%100))).toLocaleTimeString() }

      if (!event) { return '' }

      var str = null;

      if (!setTime) { setTime = new Date().getTime()/1000 }

      if (!event.time_ranges) { event.time_ranges = [] }

      // cannot be an empty array or this does not work!
      if (event.time_ranges.length>0) {
        // time ranges exist, this event is non-recurring
        event.time_ranges.forEach(function(range) {
          if (setTime >= range.start && setTime <= range.end) {
            str = ("" + 
                    dateFromUnix(range.start).toLocaleTimeString() +
                    " - " + 
                    dateFromUnix(range.end).toLocaleTimeString());
          }
        })
      } else {
        // this event recurs weekly
        if (!event.schedule.time_range) { event.schedule.time_range = [] }

        var dayArr = ["sun","mon","tue","wed","thu","fri","sat"]
          , dateSet = { "date": dateFromUnix(setTime) }
          , dayIndex = dateSet.date.getDay();

        dateSet['base100'] = dateSet.date.getHours()*100 + dateSet.date.getMinutes();

        event.schedule[dayArr[dayIndex]].forEach(function(range) {
          if ((isBetween(dateSet.base100,range) && event.schedule.time_range.length==0) 
              || isBetween(setTime,event.schedule.time_range)) {
            var globalStart = range.start 
              , globalEnd = range.end;
            if (globalStart==0) {
              event.schedule[dayArr[(dayIndex+6)%7]].forEach(function(subrange) {
                if (subrange.end==2400) {
                  globalStart = subrange.start;
                }
              })
            }
            if (globalEnd==2400) {
              event.schedule[dayArr[(dayIndex+1)%7]].forEach(function(subrange) {
                if (subrange.start==0) {
                  globalEnd = subrange.end;
                }
              })
            }
            str = dateString(setTime,globalStart) + " - " + dateString(setTime,globalEnd)
          }
        })
      }
      return str;
      // console.log('This should never be reached!');
    }
  })
  .filter('stripSeconds', function() {
    return function(timeStr) {
      return timeStr.replace(/:\d\d\s/g," ");
    }
  })