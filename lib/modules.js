var http = require('http'),
    fs = require('fs'),
    express = require('express'),
    bodyParser = require('body-parser'), 
    movieDB = require('moviedb')('240f740ebdc0cfde6b8f9e825d24e227'),
    request = require('request'),
    url = require('url');

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var	server = http.createServer(app);
var _ = require('underscore');

module.exports = {
  express: express,
  app: app,
  server: server,
  _: _,
  request: request,
  fs:fs,
  mdb:movieDB,
  url:url
}