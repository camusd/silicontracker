var rootdir = process.env.ROOT_DIR;

module.exports = function(app, conn) {
	/* Posts for the web interface
	 * These are when someone submits 
	 * a form and POSTS the data. */

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
	 	res.sendFile(rootdir + '/public/web/add.html');
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
	 	res.sendFile(rootdir + '/public/web/add.html');
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
	 	res.sendFile(rootdir + '/public/web/add.html');
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
	 	res.sendFile(rootdir + '/public/web/add.html');
	});

	/* Routes for loading pages in the web interface */

	app.get('/', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/index.html');
	});

	app.get('/add', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/add.html');
	});

	app.get('/add/cpu', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/add_cpu.html');
	});

	app.get('/add/ssd', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/add_ssd.html');
	});

	app.get('/add/memory', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/add_memory.html');
	});

	app.get('/add/flash', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/add_flash_drive.html');
	});

	app.get('/admin', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/admin.html');
	});

	app.get('/login', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/login.html');
	});

	 // For testing purposes. Will need to be deleted.
	app.get('/testsite', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/testsite.html');
	});

};