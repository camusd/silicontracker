/* Getters for the web interface */

var rootdir = process.env.ROOT_DIR;
var models = require(rootdir + '/app/models');

module.exports = function(app, conn) {

	/* 
	 * This portion of /data/XXX is returning a json object
	 * with data on the specific item.
	 * ex: /data/cpu will call the stored procedure 'get_cpu()'
	 * and get all the rows from the Processor table.
	 */


	app.get('/data/cpu', function(req, res) {
		var options = "CALL get_cpu();";
		conn.query(options, function(error, results, fields){
			if(error) {
				throw error;
			}
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
			if(error) {
				throw error;
			}
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
			if(error) {
				throw error;
			}
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
			if(error) {
				throw error;
			}
			var a = [];
			for (var i in results[0]) {
				a.push(new models.Flash_Drive(results[0][i].serial_num, results[0][i].manufacturer,
					results[0][i].capacity, results[0][i].user, results[0][i].checked_in, results[0][i].notes));
			}
			res.send(a);
		});
	});

	/* Gets the dropdown menu items when someone needs to add a new item. */
	app.get('/dd/:attr', function(req, res) {
		var attr = req.params.attr;
		conn.query('CALL get_dropdown(\''+attr+'\')',
			function(error, results, fields){
				if(error) {
					throw error;
				}
				res.send(results[0]);
			});
	});
};