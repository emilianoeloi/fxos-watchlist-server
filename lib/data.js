var modules = require('./modules');
const BD_FILE = "./movies_bd";
var fs = modules.fs;
var BD_MOVIES = [];
var save = function(movies, success, error){
	fs.writeFile(BD_FILE, JSON.stringify(movies), function(err) {
    	if(err) {
        	error(err);
    	}else{
    		success();
    	}
	});
};
var fetch = function(success, error){
	fs.readFile(BD_FILE, 'utf8', function(err,data) {
    	if(err) {
    		if(err.errno == 34){
    			success();
    		}else{
        		error(err);
        	}
    	} else {
    		success(JSON.parse(data));
    	}
	});
}

exports.saveMovie = function(movie){
	console.log('saveMovie ',movie);
	fetch(function(movies){
		var canInsert = true;
		if(typeof(movies) == 'object'){
			for(var index in movies){
				var mov = movies[index];
				if(mov.id == movie.id){
					canInsert = false;
				}
			}
			movies[movies.length] = movie;
		}else{
			movies = [movie];
		}

		console.log('saveMovie canInsert',canInsert);

		if(canInsert){
			save(movies, function(){

			}, function(err){
				console.log('saveMovie - err', err);
			});
		}
		
	}, function(err){
		console.log('saveMovie - err', err);
	});

};

exports.fetchMovies = function(success){

	fetch(function(movies){
		success(movies);
	}, function(err){
		success({});
		console.log('fetchMovies err', err);
	});

};

exports.fetchMovie = function(id, success){
	fetch(function(movies){
		for(var index in movies){
			var movie = movies[index];
			if(movie.id == id){
				success(movie);
				break;
			}
		}
	}, function(err){
		success({});
		console.log('fetchMovie err', err);
	});
}