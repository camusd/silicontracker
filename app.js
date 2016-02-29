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
var https = require('https')
var fs = require('fs');
var mysql = require('mysql');
var models = require('./app/models');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

// Loading environment variables
require('./env.js');

// Database Connections
var conn = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB || 'tracker'
});

conn.connect(function(err){
	if (err) {
		console.error('mysql: error connecting: ' + err.stack);
		return;
	}

	console.log('mysql: connected as id ' + conn.threadId);
});

// Secure Socket Layer (SSL) Credentials
var options = {
    key:    fs.readFileSync('ssl/server.key'),
    cert:   fs.readFileSync('ssl/server.crt'),
    ca:     fs.readFileSync('ssl/ca.crt'),
    requestCert:        true,
    rejectUnauthorized: false,
    passphrase: process.env.SSL_PASSPHRASE
};

// All client-side code will be handled in the public folder.
app.use(express.static('public'));


/* 
 *The execute stage
 */

// Activating the server
var ip = process.env.APP_IP || 'localhost';
var port = process.env.APP_PORT || 8080;
var server = https.createServer(options, app);
server.listen(port, ip, function(){
  console.log('Silicon Tracker Server listening at ' + ip + ':' + port);
});

/*
 * Router Handling
 */


/* Getters for the web interface
 * 
 * This portion of /data/XXX is returning a json object
 * with data on the specific item.
 * ex: /data/cpu will call the stored procedure 'get_cpu()'
 * and get all the rows from the Processor table.
 */


app.get('/data/cpu', function(req, res) {
	var options = "CALL get_cpu();";
	conn.query(options, function(error, results, fields){
		var a = [];
		for (var i in results[0]) {
			a.push(new models.CPU(results[0][i].serial_num, results[0][i].spec, results[0][i].mm, 
				results[0][i].frequency, results[0][i].stepping, results[0][i].llc, results[0][i].cores,
				results[0][i].codename, results[0][i].cpu_class, results[0][i].external_name, results[0][i].architecture,
				results[0][i].user, results[0][i].checked_in, results[0][i].notes));
		}
		res.send(a);
	});
});

app.get('/data/ssd', function(req, res) {
	var options = "CALL get_ssd();";
	conn.query(options, function(error, results, fields){
		var a = [];
		for (var i in results[0]) {
			a.push(new models.SSD(results[0][i].serial_num, results[0][i].manufacturer, 
				results[0][i].model, results[0][i].capacity, results[0][i].user,
				results[0][i].checked_in, results[0][i].notes));
		}
		res.send(a);
	});
});

app.get('/data/memory', function(req, res) {
	var options = "CALL get_memory();";
	conn.query(options, function(error, results, fields){
		var a = [];
		for (var i in results[0]) {
			a.push(new models.Memory(results[0][i].serial_num, results[0][i].manufacturer,
				results[0][i].physical_size, results[0][i].memory_type, results[0][i].capacity, 
				results[0][i].speed, results[0][i].ecc, results[0][i].ranks, results[0][i].user,
				results[0][i].checked_in, results[0][i].notes));
		}
		res.send(a);
	});
});

app.get('/data/flash', function(req, res) {
	var options = "CALL get_flash_drive();";
	conn.query(options, function(error, results, fields){
		var a = [];
		for (var i in results[0]) {
			a.push(new models.Flash_Drive(results[0][i].serial_num, results[0][i].manufacturer,
				results[0][i].capacity, results[0][i].user, results[0][i].checked_in, results[0][i].notes));
		}
		res.send(a);
	});
});

/* Posts for the web interface
 * These are when someone submits a form and POSTS the data.
 */

app.post('/add/cpu', function(req, res) {
	conn.query("CALL check_serial_cpu('"+req.body.serial_input+"');",
		function(error, results, fields){
			if(error) {
				throw error;
			}
			if(results[0].length == 0) {
				conn.query("CALL put_cpu('"+req.body.serial_input+"','"
					+req.body.spec_input+"','"+req.body.mm_input+"','"
					+req.body.freq_input+"','"+req.body.step_input+"','"
					+req.body.llc_input+"','"+req.body.cores_input+"','"
					+req.body.codename_input+"','"+req.body.class_input+"','"
					+req.body.external_input+"','"+req.body.arch_input+"','"
					+req.body.notes_input+"');",
				function(error, results, fields){
					if(error) {
						throw error;
					}
				});
			}
		});
	res.sendFile(__dirname + '/public/web/add_cpu.html');
});

app.post('/add/ssd', function(req, res) {
	conn.query("CALL check_serial_ssd('"+req.body.serial_input+"');",
		function(error, results, fields){
			if(error) {
				throw error;
			}
			if(results[0].length == 0) {
				conn.query("CALL put_ssd('"+req.body.serial_input+"','"
					+req.body.manufacturer_input+"','"+req.body.model_input+"','"
					+req.body.capacity_input+"','"+req.body.user_input+"','"
					+req.body.notes_input+"');",
				function(error, results, fields){
					if(error) {
						throw error;
					}
				});
			}
		});
	res.sendFile(__dirname + '/public/web/add_ssd.html');
});

app.post('/add/memory', function(req, res) {
	conn.query("CALL check_serial_memory('"+req.body.serial_input+"');",
		function(error, results, fields){
			if(error) {
				throw error;
			}
			if(results[0].length == 0) {
				conn.query("CALL put_memory('"+req.body.serial_input+"','"
					+req.body.manufacturer_input+"','"+req.body.physical_size_input+"','"
					+req.body.memory_type_input+"','"+req.body.capacity_input+"','"
					+req.body.speed_input+"','"+req.body.ecc_input+"','"
					+req.body.rank_input+"','"+req.body.notes_input+"');",
				function(error, results, fields){
					if(error) {
						throw error;
					}
				});
			}
		});
	res.sendFile(__dirname + '/public/web/add_memory.html');
});

app.post('/add/flash', function(req, res) {
	conn.query("CALL check_serial_flash_drive('"+req.body.serial_input+"');",
		function(error, results, fields){
			if(error) {
				throw error;
			}
			if(results[0].length == 0) {
				conn.query("CALL put_flash_drive('"+req.body.serial_input+"','"
									  	   +req.body.manufacturer_input+"','"+req.body.capacity_input+"','"
									  	   +req.body.notes_input+"');",
					function(error, results, fields){
						if(error) {
							throw error;
						}
					});
			}
		});
	res.sendFile(__dirname + '/public/web/add_flash_drive.html');
});

/* Routes for loading pages in the web interface */

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/web/index.html');
});

app.get('/add', function(req, res) {
	res.sendFile(__dirname + '/public/web/add.html');
});

app.get('/add/cpu', function(req, res) {
	res.sendFile(__dirname + '/public/web/add_cpu.html');
});

app.get('/add/ssd', function(req, res) {
	res.sendFile(__dirname + '/public/web/add_ssd.html');
});

app.get('/add/memory', function(req, res) {
	res.sendFile(__dirname + '/public/web/add_memory.html');
});

app.get('/add/flash', function(req, res) {
	res.sendFile(__dirname + '/public/web/add_flash_drive.html');
});

app.get('/admin', function(req, res) {
	res.sendFile(__dirname + '/public/web/admin.html');
});

app.get('/login', function(req, res) {
	res.sendFile(__dirname + '/public/web/login.html');
});

// For testing purposes. Will need to be deleted.
app.get('/testsite', function(req, res) {
	res.sendFile(__dirname + '/public/web/testsite.html');
});


/* Routes for loading pages in the kiosk interface */
app.get('/cart', function(req, res) {
	res.sendFile(__dirname + '/public/kiosk/cart.html');
});

app.get('/kiosk', function(req, res) {
	res.sendFile(__dirname + '/public/kiosk/index.html');
});

/* Getters for json data on items in the kiosk */

app.get('/query/:serial', function(req, res) {
	var serial = req.params.serial;

	// TODO: Put in Stored Procedure
	conn.query('SELECT * FROM Processor WHERE Processor.serial_num = \'' + serial + '\'',
		function(error, results, fields){
			if(error) {
				throw error;
			}

			var a = [];
			for (var i in results) {
			a.push(new models.CPU(results[i].serial_num, results[i].spec, results[i].mm, 
				results[i].frequency, results[i].stepping, results[i].llc, results[i].cores,
				results[i].codename, results[i].cpu_class, results[i].external_name, results[i].architecture,
				results[i].user, results[i].checked_in, results[i].notes));
			};
			res.send(a);
		});
});

/* Posts on the kiosk */

app.post('/kiosk', function(req, res) {
	 for(var i in req.body.val_array) {
	 	conn.query("CALL scan_cpu('"+req.body.user+"','"+req.body.val_array[i]+"');")
	 }
	res.sendFile(__dirname + '/public/kiosk/index.html');
});