// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery/jquery
//= require jquery_ujs
//= require angular/angular
//= require angular-resource/angular-resource
//= require angular-cookies/angular-cookies
//= require angular-route/angular-route
// require angular-bootstrap/ui-bootstrap
// require angular-bootstrap/ui-bootstrap-tpls
//= require angular-bootstrap3-patch/src/timepicker/timepicker
// require bootstrap/dist/js/bootstrap
//= require fastclick/lib/fastclick
//= require angular-facebook/lib/angular-facebook
//= require_tree .

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

if (iOS && !window.navigator.standalone) {
	$('.installer').show();
} else if (iOS && window.navigator.standalone) {
	$('body').append('<style>.headbar { padding-top:27px; } .headbar .back{ top:32px; }</style>');
}
