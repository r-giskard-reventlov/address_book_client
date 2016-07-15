'use strict';

angular.module('addressbook.organisation_persons', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/organisation_persons', {
    templateUrl: 'organisation_persons/organisation_persons.html',
    controller: 'OrganisationPersonsCtrl'
  });
}])

.controller('OrgainsationPersonsCtrl', [function() {

}]);
