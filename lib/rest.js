var modules = require('./modules');
var app = modules.app;
var data = require('./data');
var omdbapi = require('./omdbapi');

modules.app.get("/api/1.0/movies", function(req, res) { 

	var url_parts = modules.url.parse(req.url, true);

	console.log("consulta ? ", url_parts.query);

	if (url_parts.query.q) {
		modules.mdb.searchMovie({query:url_parts.query.q, language:'pt'}, function(err,movies){
			console.log('searchMovie in mdb', err, typeof res);
			res.json(movies);
		});
	}else{
		data.fetchMovies(function(movies){
			res.json(movies);
		});
	}
});

modules.app.get("/api/1.0/movies/:id", function(req, res){
	if(!isNaN(req.params.id)){
		data.fetchMovie(req.params.id, function(movie){
			res.json(movie);
		})
	}else{
		omdbapi.fetchMovieByName(req.params.id, function(omdbapiMovie){
			omdbapiMovie.id = omdbapiMovie.imdbID.replace('tt', '');
			data.saveMovie(omdbapiMovie);
			res.json(omdbapiMovie);
		})
	}
	
});
modules.app.post("/api/1.0/movies", function(req, res){
	var movie = req.body;
	console.log(JSON.stringify(req.body));
	data.saveMovie(movie);
	res.json({});
});
modules.app.put("/api/1.0/movies/:id", function(req, res){
	res.json(406);
});
modules.app.delete("/api/1.0/movies/:id", function(req, res){
	res.json(406);
})