'use strict';

window.app = angular.module('Outhouse', 
  [ 'ui.bootstrap.timepicker'
  , 'ngCookies'
  , 'ngResource'
  , 'ngRoute'
  , 'Outhouse.categories'
  , 'Outhouse.events'
  , 'Outhouse.facebook.controller'
  , 'Outhouse.facebook.directive'
  , 'facebook']);

window.angular.module('Outhouse.categories',['Outhouse.categories.controller']);
window.angular.module('Outhouse.events',['Outhouse.events.controller']);

