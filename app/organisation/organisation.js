'use strict';

angular.module('addressbook.organisation', [])
    .controller('OrganisationCtrl', ['$state', '$scope', 'Organisation', function($state, $scope, Organisation) {
	Organisation.findAll(
	    function(data) {
		$scope.organisations = data.organisations;
	    },
	    function(error) {}
	);
	$scope.selectOrganisation = function(organisation) {
	    $state.go('organisation_persons', {id: organisation.id});
	};
    }]);
