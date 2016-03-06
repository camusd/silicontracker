/*
 * app.js
 *
 * The main server code. Everything server-side is handled
 * by this app. This code is broken down into a few components.
 * There is the setup stage, execute stage, and router handling.
 */

/* 
 * The setup stage
 */

var express = require('express');
var app = express();
var http = require('http')
var fs = require('fs');
var request = require('request');
var session = require('express-session');
var models = require('./app/models');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

// Loading environment variables
require('./env.js');
process.env.ROOT_DIR = __dirname;

// Email templates
require('./app/templates.js')();

// Setting up the database
var conn = require('./app/database');
conn.connect(function(err){
	if (err) {
		throw 'mysql: error connecting: ' + err.stack;
	}
	console.log('mysql: connected as id ' + conn.threadId);
});

// TODO: SSL for database
// Secure Socket Layer (SSL) Credentials
// var options = {
//     key:    fs.readFileSync('ssl/server.key'),
//     cert:   fs.readFileSync('ssl/server.crt'),
//     ca:     fs.readFileSync('ssl/ca.crt'),
//     requestCert:        true,
//     rejectUnauthorized: false,
//     passphrase: process.env.SSL_PASSPHRASE
// };

// Setting up Session environment
var sessOptions = {
	secret: process.env.SESSION_SECRET,
	cookie: {},
	resave: false,
	saveUninitialized: true
};
if (process.env.ENV === 'prod') {
	app.use('trust proxy', 1);
	sessOptions.cookie.secure = true;
}
app.use(session(sessOptions));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static('public')); // All client-side code will be handled in the public folder.

/* 
 *The execute stage
 */

// Activating the server
var ip = process.env.APP_IP || 'localhost';
var port = process.env.APP_PORT || 8080;

var server = http.createServer(app);
server.listen(port, ip, function(){
  console.log('Silicon Tracker Server listening at ' + ip + ':' + port);
});

/*
 * Router Handling
 */

// Load the routes for the web data
require('./app/routes/data')(app, conn);

// Load the routes for the web pages
require('./app/routes/web')(app, conn);

// Load the routes for the kiosk
require('./app/routes/kiosk')(app);