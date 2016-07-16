'use strict';

angular.module('addressbook.organisation_persons', [])
    .controller('OrgainsationPersonsCtrl', ['$scope', '$stateParams', 'Organisation', function($scope, $stateParams, Organisation) {
	console.log('about to load all details for org', $stateParams);
	var organisationId = $stateParams.id;
	
	Organisation.findOneById(
	    organisationId,
	    function(data) {
		$scope.organisation = data;
	    },
	    function(error) {
		console.error('Could no load Organisation', error);
	    }
	);
	
    }]);
