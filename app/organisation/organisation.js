'use strict';

angular.module('addressbook.organisation', [])

    .controller('OrganisationCtrl', ['$state', '$scope', 'Organisation', function($state, $scope, Organisation) {

	Organisation.findAll().then(function(data) {
	    $scope.organisations = data.organisations;
	    console.log($scope.organisations);
	}).catch(function(error) {
	    console.error('could not load organisations', error);
	});
	
	$scope.addOrganisation = function() {
	    $state.go('organisation_add');
	};

	$scope.selectOrganisation = function(organisation) {
	    $state.go('organisation_persons', {id: organisation.id.href});
	};

	$scope.editOrganisation = function(organisation) {
	    $state.go('organisation_edit', {id: organisation.id.href});
	};

	$scope.deleteOrganisation = function(organisationIndex) {
	    var organisation = $scope.organisations[organisationIndex];
	    $scope.organisations.splice(organisationIndex, 1);

	    Organisation.delete(organisation.id.href).then(function(response) {
		$scope.flash = {"status": "ok", "message": "Deleted organisation"}
	    }).catch(function(error) {
		$scope.organisations.splice(organisationIndex, 0, organisation);
		console.error('could not remove to organisation', organisation, error);
		$scope.flash = {"status": "ko", "message": "Could not delete organisation"}
	    });

	};
    }])

    .controller('OrganisationAddCtrl', ['$stateParams', '$state', '$scope', 'Organisation', function($stateParams, $state, $scope, Organisation) {
	$scope.organisation = {};

	$scope.saveOrganisation = function() {
	    Organisation.create($scope.organisation).then(function(data) {
		$scope.flash = {"status": "ok", "message": "Saved organisation"}
		$scope.organisation = {};
	    }).catch(function(error) {
		console.error('could not load organisation', error);
		$scope.flash = {"status": "ko", "message": "Could no save organisation"}
	    });
	};
	
	$scope.viewOrganisations = function() {
	    $state.go('organisation');
	};
    }])

    .controller('OrganisationEditCtrl', ['$stateParams', '$state', '$scope', 'Organisation', function($stateParams, $state, $scope, Organisation) {
	console.log('editing organisation: ', $stateParams);

	Organisation.findOneById($stateParams.id).then(function(data) {
	    $scope.organisation = data.organisation;
	}).catch(function(error) {
	    console.error('could not load organisations', error);
	});

	$scope.saveOrganisation = function() {
	    Organisation.save($stateParams.id, $scope.organisation).then(function(data) {
		$state.go('organisation');
	    }).catch(function(error) {
		console.error('could not load organisation', error);
	    });
	};

	$scope.viewOrganisations = function() {
	    $state.go('organisation');
	};
    }]);

