'use strict';

angular.module('addressbook.organisation', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/organisation', {
	templateUrl: 'organisation/organisation.html',
	controller: 'OrganisationCtrl'
      });
    }])

    .factory('Organisation', ['$http', function($http) {

	var _discoverServices = function() {
	    return $http.get('http://localhost:8080').then(function(response) {
		return response.data;
	    });
	}

	var _linkWithRel = function(links, rel) {
	    for(var i=0; i<links.length; i++) {
		if(rel == links[i]['rel']) {
		    return links[i].href;
		} else {
		    return null
		}
	    }
	}

	return {
	    findAll: function(callback, callbackError) {
		_discoverServices().then(function(data) {
	    	    var org_url = _linkWithRel(data.links, 'organisations');
		    return $http.get(org_url).then(function(response) {
			callback(response.data);
		    });
		});
	    },
	    findOneById: function(id, callbacl, callbackError) {

	    }
	}

    }])

    .controller('OrganisationCtrl', ['$state', '$scope', 'Organisation', function($state, $scope, Organisation) {
	Organisation.findAll(
	    function(data) {
		$scope.organisations = data.organisations;
	    },
	    function(error) {}
	);
	$scope.selectOrganisation = function(organisation) {
	    console.log('selected %s', JSON.stringify(organisation));
	    state.go();
	};
    }]);
