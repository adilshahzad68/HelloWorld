// Module dependencies.
var express = require('express');
var routes = require('./routes');
var path = require('path');

var app = express();

var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');

// MongoClient
var MongoClient = require('mongodb').MongoClient;
// Database
var db;

// setup mongo connection
MongoClient.connect('mongodb+srv://adilstore123:<password>@cluster0.g8jpb1b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', function(err, database) {
	if (err) {
		throw err;
	}
	else {
		db = database;
		console.log("Connected to db!");
	}
});

// make our db accessible to our router
app.use(function(req, res, next) {
	req.db = db;
	next();
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'uwotm8'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}