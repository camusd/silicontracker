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
var mysql = require('mysql');
var http = require('http')
var fs = require('fs');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
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
var db_options = {
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB || 'tracker'
};

if (process.env.DB_SSL === true) {
	db_options.ssl = {
		ca: fs.readFileSync(process.env.ROOT_DIR + '/ssl/silicontracker_xyz.crt')
	}
}

var pool;
// handleConnection()
// When the database/server connection is lost due to connection issues,
// the system will attempt to reconnect. 
function handleConnection() {
	pool = mysql.createPool(db_options);
	pool.getConnection(function(err, connection) {
		if(err) {
	      console.log('error when connecting to db:', err);
	      setTimeout(handleConnection, 2000);
	    }  else {
    		console.log('Mysql pool connection established.');
	    }
	});
	pool.on('error', function(err) {
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
	      handleConnection();
	    } else {
	      throw err;
	    }
	});
}

handleConnection();

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
	name: 'tracker-cookie',
	store: new FileStore,
	secret: process.env.SESSION_SECRET,
	cookie: {},
	resave: false,
	saveUninitialized: false,
	name: 'my.tracker.sid'
};
if (process.env.ENV === 'prod') {
	app.enable('trust proxy');
	sessOptions.cookie.secure = true;
}
app.use(session(sessOptions));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 10000, limit: '50mb'}));
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
require('./app/routes/data')(app, pool);

// Load the routes for the web pages
require('./app/routes/web')(app, pool);

// Load the routes for the kiosk
require('./app/routes/kiosk')(app, pool);

// Send emails for overdue items
var j = schedule.scheduleJob('00 00 * * 0', function() {
	var item_serial = [];
	var item_type = [];
	var days = [];
	var addr, first_name, last_name;
  pool.getConnection(function(err, conn) {
		conn.query("CALL get_overdue_owner();",
			function(error, results, fields) {
				if(error) {
					throw error;
				}
				var owner = results[0];
				for(var i in owner) {
					conn.query("CALL get_checkout_summary("+owner[i].wwid+","+owner[i].overdue_item_email_setting+");",
						function(error, results, fields) {
							if(error) {
								throw error;
							}
							var total_finished = 0;
							for(var j in results[0]) {
								item_serial[j] = results[0][j].serial_num;
								item_type[j] = results[0][j].item_type;
								days[j] = results[0][j].days;
								total_finished++;
								if(total_finished == results[0].length) {
									addr = results[0][0].email_address;
									first_name = results[0][0].first_name;
									last_name = results[0][0].last_name;
									console.log("Sending reminder email to "+addr+"...");
									reminderTemplate(addr, first_name, last_name, item_serial, item_type, days);
								}
							}
						});
				}
			});
	});
});
