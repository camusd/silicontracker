var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var mysql = require('mysql');
var models = require('./app/models');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

// Database Connections
var conn = mysql.createConnection({
	  host : process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
	  port : process.env.OPENSHIFT_MYSQL_DB_PORT || 3307,
	  user : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'adminla1Z7lq',
	  password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || '8hr7dIZ-NPVQ',
	  database : 'tracker'	
  });

conn.connect(function(err){
	if (err) {
		console.error('mysql: error connecting: ' + err.stack);
		return;
	}

	console.log('mysql: connected as id ' + conn.threadId);
});

app.use(express.static('public'));

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8082);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

// var options = {
// 	key: fs.readFileSync('server.key'),
// 	cert: fs.readFileSync('server.crt')
// };
 
// https.createServer(options, app).listen(app.get('port'), app.get('ip'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

server.listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function(kiosk) {
	console.log('client connected.');
	kiosk.on('serial', function(data) {
		console.log(data);
		io.emit('fromServer', 'The server says:\n' + data);
	});
});

/**************************************
 *
 *	Server Routes
 *
 **************************************/

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/web/index.html');
});

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


// For testing purposes. Will need to be deleted.
app.get('/testsite', function(req, res) {
	res.sendFile(__dirname + '/public/web/testsite.html');
});
// For testing purposes. Will need to be deleted.
app.get('/barcode', function(req, res) {
	res.sendFile(__dirname + '/public/kiosk/socket.html');
});
// For testing purposes. Will need to be deleted.
app.get('/arrays', function(req, res) {
	res.sendFile(__dirname + '/public/web/arrays.txt');
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




app.get('/kiosk', function(req, res) {
	res.sendFile(__dirname + '/public/kiosk/index.html');
});

app.get('/kiosk/cart', function(req, res) {
	res.sendFile(__dirname + '/public/kiosk/cart.html');
});