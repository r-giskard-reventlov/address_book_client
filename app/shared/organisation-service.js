angular.module('addressbook.organisation.service', [])

    .factory('Organisation', ['$http', function($http) {

	// TODO: host + port as config
	var SERVER = 'http://localhost:8080';
	
	var _discoverServices = function() {
	    return $http.get(SERVER).then(
		function(response) {
		    return response.data;
		});
	}

	var _linkWithRel = function(links, rel) {
	    for(var i=0; i<links.length; i++) {
		if(rel == links[i]['rel']) {
		    return links[i].href;
		} 
	    }
	    return null;
	}

	return {
	    findAll: function() {
		return _discoverServices().then(function(data) {
	    	    var org_url = _linkWithRel(data.links, 'organisations');
		    return $http.get(org_url).then(function(response) {
			return response.data;
		    });
		});
	    },
	    findOneById: function(id) {
		return $http.get(id).then(
		    function(response) {
			return response.data;
		    });
	    },
    	    create: function(organisation) {
		return _discoverServices().then(function(data) {
		    var org_url = _linkWithRel(data.links, 'organisations');
		    return $http.post(org_url, organisation).then(function(response) {
			return response.data;
		    });
		});
	    },
    	    delete: function(id) {
		return $http.delete(id).then(function(response) {
		    return response.data;
		});
	    },
	    save: function(id, organisation) {
		return $http.put(id, organisation).then(function(response) {
		    return response.data;
		});
	    }
	}
    }])

