var mysql = require('mysql');

module.exports = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB || 'tracker'
});