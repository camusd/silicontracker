
var express = require('express');
var fs = require('fs');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
		res.sendFile('index.html');
	});

var server = app.listen(3000, function() {
	var host = server.address().address;
	var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
	var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
	console.log('listening at http://%s:%s', host, port);
});