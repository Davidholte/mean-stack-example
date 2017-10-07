// SETUP
//======================================================================
var express = require('express');
var app = express(); 						        // create app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./database/database'); 	    // load database from config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// DATABASE URI
//=======================================================================
mongoose.connect('mongodb://dave:yo@ds113455.mlab.com:13455/mean-stack', {
    useMongoClient: true,
    /* other options */
  });

// CONFIGURATION
//=======================================================================
app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// API ROUTES
//=======================================================================
require('./app/api-routes.js')(app);

// PORT
//=======================================================================
app.listen(port);
console.log("Magic happens on: " + port);
