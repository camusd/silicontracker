
var express = require('express');
var app = express();
var http = require('http');

app.use(express.static('public'));

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');
 
http.createServer(app).listen(app.get('port'), app.get('ip'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/web/index.html');
});

app.get('/data', function(req, res) {
	res.sendFile(__dirname + '/public/web/data.txt');
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