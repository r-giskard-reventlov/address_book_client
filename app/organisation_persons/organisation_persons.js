'use strict';

angular.module('addressbook.organisation_persons', [])

    .controller('OrgainsationPersonsCtrl', ['$state', '$scope', '$stateParams', 'Organisation', function($state, $scope, $stateParams, Organisation) {
	console.log('about to load all details for org', $stateParams);

	Organisation.findOneById($stateParams.id).then(function(response) {
	    $scope.organisation = response.organisation;
	}).catch(function(error) {
	    console.error('Could no load Organisation', error);
	});
	
	$scope.addPerson = function() {
	    $state.go('organisation_persons_add', {id: $stateParams.id});
	};
	
	$scope.viewOrganisations = function() {
	    $state.go('organisation');
	};
	
	$scope.editPerson = function(personIndex) {
	    $state.go('organisation_persons_edit', {id: $stateParams.id, personIndex: personIndex});
	};
	
	$scope.deletePerson = function(personIndex) {
	    var person = $scope.organisation.persons[personIndex];
	    $scope.organisation.persons.splice(personIndex, 1);

	    Organisation.save($stateParams.id, $scope.organisation).then(function(response) {
		$scope.flash = {"status": "ok", "message": "Deleted person"}
	    }).catch(function(error) {
		$scope.organisation.persons.splice(personIndex, 0, person);
		console.error('could not remove person', person, error);
		$scope.flash = {"status": "ko", "message": "Could not delete person"}
	    });
	};
    }])

    .controller('OrgainsationPersonsAddCtrl', ['$state', '$scope', '$stateParams', 'Organisation', function($state, $scope, $stateParams, Organisation) {
	console.log('adding a persons to org', $stateParams);

	$scope.person = {};

	Organisation.findOneById($stateParams.id).then(function(response) {
	    $scope.organisation = response.organisation;
	}).catch(function(error) {
	    console.error('Could no load Organisation', error);
	});
	
	$scope.save = function() {
    	    $scope.organisation.persons.push($scope.person);

	    Organisation.save($stateParams.id, $scope.organisation).then(function(response) {
		$scope.flash = {"status": "ok", "message": "Saved person"}
		$scope.person = {}
	    }).catch(function(error) {
		console.error('could not add person to organisation', $scope.organisation, error);
		$scope.flash = {"status": "ko", "message": "Could no save person"}
	    });
	};
	
	$scope.back = function() {
	    $state.go('organisation_persons', {id: $stateParams.id});
	};
    }])

    .controller('OrgainsationPersonsEditCtrl', ['$state', '$scope', '$stateParams', 'Organisation', function($state, $scope, $stateParams, Organisation) {
	console.log('editing a persons in org', $stateParams);

	Organisation.findOneById($stateParams.id).then(function(response) {
	    $scope.organisation = response.organisation;
	    $scope.person = response.organisation.persons[$stateParams.personIndex];
	    console.log($scope.person);
	}).catch(function(error) {
	    console.error('Could no load Organisation', error);
	});
	
	$scope.save = function() {
	    Organisation.save($stateParams.id, $scope.organisation).then(function(data) {
		$scope.flash = {"status": "ok", "message": "Saved person"}
	    }).catch(function(error) {
		console.error('could not edit person in organisation', $scope.organisation, error);
		$scope.flash = {"status": "ko", "message": "Could no save person"}
	    });
	};
	
	$scope.back = function() {
	    $state.go('organisation_persons', {id: $stateParams.id});
	};
    }]);
