var express = require('express');
var app = express();
var server = require('http').createServer(app);

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// { username, isAdminFlag}
var users = [
	{'user': 'brett',
	 'isAdmin': 1},
	{'user': 'joseph',
	 'isAdmin': 1},
	{'user': 'dylan',
	 'isAdmin': 1},
	{'user': 'nonadminuser',
	 'isAdmin': 0}
]

var ip = process.env.APP_IP || 'localhost';
var port = process.env.CRED_PORT || 8082;

server.listen(port, ip, function(){
  console.log('Credentials Server listening at ' + ip + ':' + port);
});

app.post('/', function(req, res) {
	var userExists = 0;
	username = req.body.username;
	for (var i = 0; i < users.length; i++) {
		if (users[i].user == username) {
			res.json(users[i]);
			userExists = 1;
		}
	}
	if (!userExists) {
		res.send('no users');		
	}
});