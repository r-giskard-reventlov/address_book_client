angular.module('addressbook.organisation.service', [])
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
	    findOneById: function(id, callback, callbackError) {
		_discoverServices().then(function(data) {
	    	    var org_url = _linkWithRel(data.links, 'organisations');
		    return $http.get(org_url + "/" + id).then(function(response) {
			callback(response.data);
		    });
		});
	    }
	}
    }])

