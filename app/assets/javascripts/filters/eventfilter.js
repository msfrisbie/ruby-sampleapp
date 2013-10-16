'use strict';

window.angular.module('Outhouse.events.filter', [])
  .filter('relevantTimeRangeString', function() {
    return function(event, setTime) {
      // return 'it worked!'+input;

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
            // console.log("Open from " + 
            //         new Date(range.start*1000).toLocaleTimeString() +
            //         " to " + 
            //         new Date(range.end*1000).toLocaleTimeString())
            str = ("" + 
                    new Date(range.start*1000).toLocaleTimeString() +
                    " - " + 
                    new Date(range.end*1000).toLocaleTimeString());
          }
        })
      } else {
        // this event recurs weekly
        var dateSet = {
          "date": new Date(setTime*1000)
        };
        // dateSet['base100'] = dateSet.date.getHours()*100 + dateSet.date.getMinutes()*5/3;
        dateSet['base100'] = dateSet.date.getHours()*100 + dateSet.date.getMinutes();

        event.schedule[["sun","mon","tue","wed","thu","fri","sat"][dateSet.date.getDay()]].forEach(function(range) {
          if (dateSet.base100 >= range.start && dateSet.base100 <= range.end) {
            // if (!event.schedule.time_range) {
            //   // JANK JANK JANK JANK JANK
            //   str = "" + 
            //           new Date(new Date(new Date(setTime*1000).setHours(range.start/100)).setMinutes((range.start%100)*3/5)).toLocaleTimeString() +
            //           " - " + 
            //           new Date(new Date(new Date(setTime*1000).setHours(range.end/100)).setMinutes((range.end%100)*3/5)).toLocaleTimeString()

            // } else {
            //   if (setTime >= event.schedule.time_range.start && setTime <= event.schedule.time_range.end) {
            //     str = "" + 
            //             new Date(new Date(new Date(setTime*1000).setHours(range.start/100)).setMinutes((range.start%100)*3/5)).toLocaleTimeString() +
            //             " - " + 
            //             new Date(new Date(new Date(setTime*1000).setHours(range.end/100)).setMinutes((range.end%100)*3/5)).toLocaleTimeString() 
            //   }
            // }
            if (!event.schedule.time_range) {
              // JANK JANK JANK JANK JANK
              str = "" + 
                      new Date(new Date(new Date(setTime*1000).setHours(range.start/100)).setMinutes((range.start%100))).toLocaleTimeString() +
                      " - " + 
                      new Date(new Date(new Date(setTime*1000).setHours(range.end/100)).setMinutes((range.end%100))).toLocaleTimeString()

            } else {
              if (setTime >= event.schedule.time_range.start && setTime <= event.schedule.time_range.end) {
                str = "" + 
                        new Date(new Date(new Date(setTime*1000).setHours(range.start/100)).setMinutes((range.start%100))).toLocaleTimeString() +
                        " - " + 
                        new Date(new Date(new Date(setTime*1000).setHours(range.end/100)).setMinutes((range.end%100))).toLocaleTimeString() 
              }
            }
          }
        })
      }
      return str;
      console.log('This should never be reached!');
      // return new Date(input*1000).toLocaleTimeString();
    }
  })
  .filter('stripSeconds', function() {
    return function(timeStr) {
      return timeStr.replace(/:\d\d\s/g," ");
    }
  })