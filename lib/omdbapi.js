var modules = require('./modules');
var request = modules.request;

exports.fetchMovieByName = function(name, success, error){
	request({
            method: 'GET',
            uri: 'http://www.omdbapi.com/?t='+name+'&y=&plot=short&r=json'}, function(e, r, b){
            	success(JSON.parse(b));
            });
}

