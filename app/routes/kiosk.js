var rootdir = process.env.ROOT_DIR;
var request = require('request');
var models = require(rootdir + '/app/models');

require('../templates')();

module.exports = function(app, pool) {
		 /* Routes for loading pages in the kiosk interface */
	app.get('/cart', enforceLogin, function(req, res) {
	 	res.sendFile(rootdir + '/public/kiosk/cart.html');
	});

	app.get('/kiosk', function(req, res) {
		res.sendFile(rootdir + '/public/kiosk/kiosk.html');
	});

	 /* Getters for json data on items in the kiosk */
	app.get('/serial/:serial', function(req, res) {
	 	var serial = req.params.serial;
	 	// TODO: Put in Stored Procedure
	 	// and JOIN with necessary tables
    pool.getConnection(function(err, conn) {
		 	conn.query('CALL get_scanned_item("' + serial + '");',
		 		function(error, results, fields){
		 			if(error) {
		 				throw error;
		 			}
		 			conn.release();

		 			results = results[0][0];

		 			var jsonToSend;
		 			if (results.item_type === 'cpu') {
			 			jsonToSend = new models.CPU(results.serial_num, results.spec, results.mm, 
			 				results.frequency, results.stepping, results.llc, results.cores,
			 				results.codename, results.cpu_class, results.external_name, results.architecture,
			 				results.user, results.checked_in, results.notes);
			 		} else if (results.item_type === 'ssd') {
			 			jsonToSend = new models.SSD(results.serial_num, results.manufacturer, 
            				results.model, results.capacity, results.user,
            				results.checked_in, results.notes);
			 		} else if (results.item_type === 'memory') {
			 			jsonToSend = new models.Memory(results.serial_num, results.manufacturer,
            				results.physical_size, results.memory_type, results.capacity, 
            				results.speed, results.ecc, results.ranks, results.user,
            				results.checked_in, results.notes);
			 		} else if (results.item_type === 'flash_drive') {
			 			jsonToSend = new models.Flash_Drive(results.serial_num, results.capacity,
            				results.manufacturer, results.user, results.checked_in, results.notes);
			 		} else if (results.item_type === 'board') {
			 			jsonToSend = new models.Board(results.serial_num, results.fpga,
            				results.bios, results.mac, results.fab,
            				results.user, results.checked_in, results.notes);
			 		} else if (results.item_type === 'NA') {
			 			jsonToSend = {err: 'Item Not Found'};
			 		}

			 		if (results.item_type !== 'NA') {
			 			jsonToSend.item_type = results.item_type;
			 			jsonToSend.checked_in = (results.checked_in === 1 ? 'Checked In' : 'Checked Out');
		 				jsonToSend.scrapped = (results.scrapped === 1 ? 'Scrapped' : 'Not Scrapped');
			 		}
		 			
		 			res.json(jsonToSend);
		 		});
		});
	});

	 /* Getters for json data on items in the cart */
	app.get('/cart/serial/:serial', function(req, res) {
	 	var serial = req.params.serial;
	 	// TODO: Put in Stored Procedure
    pool.getConnection(function(err, conn) {
		 	conn.query('SELECT checked_in FROM Items JOIN Processor ON Processor.product_id = Items.id WHERE Processor.serial_num = \'' + serial + '\'',
		 		function(error, results, fields){
		 			if(error) {
		 				throw error;
		 			}
		 			conn.release();

		 			if (process.env.ENV == 'dev')
		 				console.log(results[0]);
		 			
		 			res.send(results[0]);
		 		});
		});
	});

	/* Posts on the kiosk */
	app.post('/kiosk/submit', function(req, res) {	
		var item_serial = [];
		var item_type = [];
		var status = [];
		var wwid = req.session.wwid;
		var serial_nums = req.body.data;
		var total_finished = 0;
		var addr, first_name, last_name, date;
    for(var i=0; i < serial_nums.length; i++) {
    	pool.getConnection(function(i, err, conn) {
      	conn.query("CALL scan_cpu("+ wwid +",'"+serial_nums[i]+"');",
      		function(error, results, fields) {
      			if(error) {
      				throw error;
      			}
						addr = results[0][0].email_address;
						first_name = results[0][0].first_name;
						last_name = results[0][0].last_name;
						item_serial[i] = results[0][0].serial_num;
						item_type[i] = results[0][0].item_type;
						status[i] = results[0][0].checked_in;
						date = results[0][0].order_date;
						
						total_finished++;
						if (total_finished === serial_nums.length) {
							console.log("Sending cart email to "+addr+"...");
							cartTemplate(addr, first_name, last_name, item_serial, item_type, status, date);
							req.session.destroy(function (err) {
								if (err) {
						    	console.log(err)
					    	} else {
					    		res.clearCookie('my.tracker.sid');
									res.redirect('/kiosk');
					    	}
						  });
						}  
					});
      }.bind(pool, i));
    }
	});


	/* 
	 * Middleware for logging into the kiosk. We need a few things done in sequential order.
	 *
	 * 1. Go to Intel's Active Directory Server, get WWID back.
	 * 2. Check our database for user information using the WWID as a key.
	 *
	 * After that, we have the user's name and wwid stored in session, and can allow them into the cart.
	 */
	app.use('/kiosk/login', function(req, res, next) {
		request.post({url: process.env.CRED_ADDR, form: {'username': req.body.username, 'pass': req.body.pass}},
	 		function(error, response, body) {
	 			if (error) {
	 				console.log(error);
	 			}
	 			// Checking if the user exists in AD.
	 			if (body !== '') {
	 				// We have a user in the AD system. Parse out the wwid.
	 				req.session.wwid = body;
	 				next();
	 			} else {
	 				// No wwid found, send user back to login page.
	 				res.redirect('/kiosk');
	 			}
	 		});
	}, function(req,res,next) {
		// We know at this point we have a wwid, so let's try to get the user from our DB.
      	pool.getConnection(function(err, conn) {
			conn.query('CALL get_user_from_wwid('+req.session.wwid+')', function(error, results, fields) {
					if (error) {
						throw error;
					}
		 			conn.release();
					
					if (results[0].length === 1) {
		 				req.session.last_name = results[0][0].last_name;
		 				req.session.first_name = results[0][0].first_name;
		 				req.session.is_admin = results[0][0].is_admin;
		 				req.session.save();
					} else {
						// Got no results
						res.redirect('/kiosk');
					}
					next();
		 		});
		});
	});

	app.post('/kiosk/login', function(req, res) {
		// If we made it this far through the middleware,
		// It must mean success. Send them to the cart!

		//TEST LOGS
		if (process.env.ENV === 'dev') {
			console.log(req.session.wwid);
			console.log(req.session.last_name);
			console.log(req.session.first_name);
		}
		
		res.redirect('/cart');
	});
};

function enforceLogin(req, res, next) {
	if (req.session.wwid) {
		next();
	} else {
		res.redirect('/kiosk');
	}
}
