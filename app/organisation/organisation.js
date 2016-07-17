'use strict';

angular.module('addressbook.organisation', [])
    .controller('OrganisationCtrl', ['$state', '$scope', 'Organisation', function($state, $scope, Organisation) {
	$scope.organisations = [];
	Organisation.findAll(
	    function(data) {
		$scope.organisations = data.organisations;
		console.log($scope.organisations);
	    },
	    function(error) {
		console.error('could not load organisations', error);
	    }
	);
	$scope.selectOrganisation = function(organisation) {
	    $state.go('organisation_persons', {id: organisation.id});
	};
	$scope.editOrganisation = function(organisation) {
	    $state.go('organisation_edit', {id: organisation.id});
	};
    }])
    .controller('OrganisationEditCtrl', ['$stateParams', '$state', '$scope', 'Organisation', function($stateParams, $state, $scope, Organisation) {
	console.log('editing organisation: ', $stateParams);
	$scope.organisation = {};
	Organisation.findOneById(
	    $stateParams.id,
	    function(data) {
		$scope.organisation = data.organisation;
	    },
	    function(error) {}
	);
	$scope.saveOrganisation = function() {
	    Organisation.save(
		$scope.organisation,
		function(data) {
		    $state.go('organisation');
		},
		function(error) {

		});
	};
    }]);

