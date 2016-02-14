var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var fs = require('fs');
var mysql = require('mysql');
var models = require('./app/models')

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

http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


/**************************************
 *
 *	Server Routes
 *
 **************************************/

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/web/index.html');
});

app.get('/data', function(req, res) {
	// TODO: Turn SQL string into a stored proc.
	var options = {sql: 'SELECT * FROM Items item JOIN CPU cpu ON item.id = cpu.product_id',
				   nestTables: '_'};
	conn.query(options, function(error, results, fields){
		var a = [];
		for (i = 0; i < results.length; i++) {
			a.push(new models.CPUVM(results[i].item_id, results[i].cpu_spec, results[i].cpu_mm, 
									results[i].cpu_frequency, results[i].cpu_stepping, results[i].cpu_llc, 
									results[i].cpu_cores, results[i].cpu_codename, results[i].cpu_cpu_class, 
									results[i].cpu_external_name, results[i].cpu_architecture));
		}
		res.send(a);
	});
});


// For testing purposes. Will need to be deleted.
app.get('/testsite', function(req, res) {
	res.sendFile(__dirname + '/public/web/testsite.html');
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