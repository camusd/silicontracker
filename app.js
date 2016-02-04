var express = require('express');
var app = express();
var http = require('http');
var https = require('https');
var fs = require('fs');
//var nodemailer = require('nodemailer');
//var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com')
var mysql = require('mysql');
var models = require('./models')

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



// app.get('*', function(req, res) {
// 	if (!req.secure) {
// 		res.redirect('https://tracker-hayesbre.rhcloud.com'+req.url);
// 	}
// });

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/web/index.html');
});

app.get('/data', function(req, res) {
	conn.query('SELECT * FROM Items', function(error, results, fields){
		a = [];
		for (i = 0; i < results.length; i++) {
			a.push(new models.Item(results[i].type, 
								   results[i].serial_num, 
								   results[i].checked_in, 
								   results[i].notes, 
								   results[i].scrapped));
		}
		res.send(a);
	});
});

app.get('/additem', function(req, res) {
	res.sendFile(__dirname + '/public/web/add.html');
});

app.get('/admin', function(req, res) {
	res.sendFile(__dirname + '/public/web/admin.html');
});

app.get('/kiosk', function(req, res) {
	res.sendFile(__dirname + '/public/kiosk/index.html');
});

app.get('/kiosk/cart', function(req, res) {
	res.sendFile(__dirname + '/public/kiosk/cart.html');
});