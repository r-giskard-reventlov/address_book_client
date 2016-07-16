'use strict';

// Declare app level module which depends on views, and components
angular.module('addressbook', [
    'addressbook.organisation',
    'addressbook.organisation_persons',
    'addressbook.organisation.service',
    'ui.router',
    'ui.bootstrap'])

    .run(function($rootScope) {
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
	    console.error("$stateChangeError: ", toState, error);
	});
    })

    .config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
	    .state('organisation', {
		url: '/organisation',
		templateUrl: 'organisation/organisation.html',
		controller: 'OrganisationCtrl'
	    })
	    .state('organisation_persons', {
		url: '/organisation_persons',
		templateUrl: 'organisation_persons/organisation_persons.html',
		controller: 'OrgainsationPersonsCtrl',
		params: { id: null }
	    });

	$urlRouterProvider.otherwise('/organisation');
    });
