'use strict';

angular.module('addressbook.organisation_persons', [])
    .controller('OrgainsationPersonsCtrl', ['$state', '$scope', '$stateParams', 'Organisation', function($state, $scope, $stateParams, Organisation) {
	console.log('about to load all details for org', $stateParams);
	$scope.organisation = {};
	Organisation.findOneById(
	    $stateParams.id,
	    function(data) {
		$scope.organisation = data;
	    },
	    function(error) {
		console.error('Could no load Organisation', error);
	    }
	);
	$scope.addPerson = function() {
	    console.log($scope.organisation);
	    console.log(JSON.stringify($scope.organisation));
	    console.log(JSON.stringify($scope.organisation.id));
	    $state.go('organisation_persons_add', {id: $scope.organisation.id});
	};
    }])
    .controller('OrgainsationPersonsAddCtrl', ['$scope', '$stateParams', 'Organisation', function($scope, $stateParams, Organisation) {
	console.log('adding a persons to org', $stateParams);
	
    }]);
