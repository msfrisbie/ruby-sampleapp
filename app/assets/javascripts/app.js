'use strict';

window.app = angular.module('Outhouse', ['ngCookies', 'ngResource', 'ngRoute', 'Outhouse.categories','Outhouse.events']);

window.angular.module('Outhouse.categories',['Outhouse.categories.controller']);
window.angular.module('Outhouse.events',['Outhouse.events.controller']);

