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
var session = require('express-session');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var schedule = require('node-schedule');
require('./app/templates')();

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
require('./app/routes/kiosk')(app, conn);

// Send emails for overdue items
var j = schedule.scheduleJob('00 00 * * 0', function() {
	conn.query("CALL get_checkout();",
		function(error, results, fields) {
			if(error) {
				throw error;
			}
			for(var i in results[0]) {
				var addr = results[0][i].email_address;
				var first_name = results[0][i].first_name;
				var last_name = results[0][i].last_name;
				var item_serial = results[0][i].serial_num;
				var item_type = results[0][i].item_type;
				var days = results[0][i].days;
				console.log("Sending reminder email to "+addr+"...");
				reminderTemplate(addr, first_name, last_name, item_serial, item_type, days);
			}
		});
});