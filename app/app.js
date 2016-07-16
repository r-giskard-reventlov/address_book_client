'use strict';

// Declare app level module which depends on views, and components
angular.module('addressbook', [
  'ngRoute',
  'addressbook.organisation',
  'addressbook.organisation_persons',
  'ui.bootstrap'  
  //'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/organisation'});
}]);
