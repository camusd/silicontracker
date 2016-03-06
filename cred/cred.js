var express = require('express');
var app = express();
var server = require('http').createServer(app);

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

var users = [
	{'user': 'brett',
	 'wwid': '123'},
	{'user': 'joseph',
	 'wwid': '234'},
	{'user': 'dylan',
	 'wwid': '456'},
	{'user': 'nonadminuser',
	 'wwid': '1'}
]

var ip = process.env.APP_IP || 'localhost';
var port = process.env.CRED_PORT || 8082;

server.listen(port, ip, function(){
  console.log('Credentials Server listening at ' + ip + ':' + port);
});


/*
 * 	If the username entered was in our mock credentials server, send back the wwid.
 *	If there were no users, send back empty string.
 */
app.post('/', function(req, res) {
	var userExists = 0;
	var sendData = '';
	username = req.body.username;
	password = req.body.pass; // currently does nothing with the password.
	for (var i = 0; i < users.length; i++) {
		if (users[i].user === username) {
			sendData = users[i].wwid;
			break;
		}
	}
	res.send(sendData);		
});