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
		_discoverServices().then(
		    function(data) {
	    		var org_url = _linkWithRel(data.links, 'organisations');
			return $http.get(org_url).then(function(response) {
			    callback(response.data);
			});
		    },
		    function(error) {
			console.error('could not discover services', error);
		    });
	    },
	    findOneById: function(id, callback, callbackError) {
		_discoverServices().then(
		    function(data) {
	    		var org_url = _linkWithRel(data.links, 'organisations');
			return $http.get(org_url + "/" + id).then(function(response) {
			    callback(response.data);
			});
		    },
		    function(error) {
			console.error('could not discover services', error);
		    });
	    },
	    save: function(organisation, callback, callbackError) {
		// organisation will eventually have a id represented as a url, allowing for easy url without need to build up
		var org_url = 'http://localhost:8080/organisations/' + organisation.id;
		return $http.put(org_url, organisation).then(function(response) {
		    callback(response.data);
		});
	    }
	}
    }])

