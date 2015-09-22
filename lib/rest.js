var modules = require('./modules');
var app = modules.app;
var data = require('./data');

modules.app.get("/api/1.0/movies", function(req, res) { 
	data.fetchMovies(function(movies){
		res.json(movies);
	}); 
});

modules.app.get("/api/1.0/movies/:id", function(req, res){
	data.fetchMovie(req.params.id, function(movie){
		res.json(movie);
	})
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