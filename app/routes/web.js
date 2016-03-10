var rootdir = process.env.ROOT_DIR;
var request = require('request');

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

	app.get('/admin', enforceLogin, function(req, res) {
	 	res.sendFile(rootdir + '/public/web/admin.html');
	});

	app.get('/admin/attributes', enforceLogin, function(req, res) {
		res.sendFile(rootdir + '/public/web/edit_dropdowns.html');
	});

	// TODO: Add new attributes to the database
	app.post('/admin/attributes', enforceLogin, function(req, res) {
		console.log(req.body);
		res.send({redirect: '/admin'});
	});

	 // For testing purposes. Will need to be deleted.
	app.get('/testsite', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/testsite.html');
	});

	app.get('/login', function(req, res) {
	 	res.sendFile(rootdir + '/public/web/login.html');
	});

	/* 
	 * Middleware for logging into the web interface. We need a few things done in sequential order.
	 *
	 * 1. Go to Intel's Active Directory Server, get WWID back.
	 * 2. Check our database for user information using the WWID as a key.
	 *
	 * After that, we have the user's name and wwid stored in session, and can allow them into the cart.
	 */
	app.use('/login/login', function(req, res, next) {
		request.post({url: process.env.CRED_ADDR, form: {'username': req.body.username, 'pass': req.body.pass}},
	 		function(error, response, body) {
	 			if (error) {
	 				console.log(error);
	 			}

	 			// Checking if the user exists in AD.
	 			if (body !== '') {
	 				// We have a user in the AD system. Parse out the wwid.
	 				req.session.wwid = body;
	 			} else {
	 				// No wwid found, erase current session and create new session for user.
	 				req.session.regenerate();
	 				res.redirect('/login');
	 			}
	 			next();
	 		});
	}, function(req,res,next) {
		// We know at this point we have a wwid, so let's try to get the user from our DB.
		conn.query('CALL get_user_from_wwid('+req.session.wwid+')', function(error, results, fields) {
				if (error) {
					throw error;
				}
				if (results[0].length === 1) {
	 				req.session.last_name = results[0][0].last_name;
	 				req.session.first_name = results[0][0].first_name;
	 				req.session.is_admin = results[0][0].is_admin;
	 				req.session.save();
				} else {
					// Got no results
					res.redirect('/login');
				}
				next();
	 		});
	});

	app.post('/login/login', function(req, res) {
		// If we made it this far through the middleware,
		// It must mean success. Send them to the cart!

		//TEST LOGS
		if (process.env.ENV === 'dev') {
			console.log(req.session.wwid);
			console.log(req.session.last_name);
			console.log(req.session.first_name);
		}
		
		res.redirect('/');
	});

};

function enforceLogin(req, res, next) {
	if (req.session.wwid) {
		next();
	} else {
		res.redirect('/login');
	}
}