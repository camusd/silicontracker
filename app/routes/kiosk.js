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
			 		} else if (results.item_type === 'flash') {
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

	app.get('/user/:serial', function(req, res) {
	 	var serial = req.params.serial;
    pool.getConnection(function(err, conn) {
		 	conn.query('CALL get_user_from_checkout("' + serial + '");',
		 		function(error, results, fields){
		 			if(error) {
		 				throw error;
		 			}
		 			conn.release();

		 			res.send(results[0][0]);
		 		});
		 });
  });

	// After the user is in the cart, get all the saved items.
	app.get('/kiosk/saveforlater', function(req, res) {
		// get status
		res.status(200).json(req.session.saveForLater);
		req.session.saveForLater = [];
	});

	/* Posts on the kiosk */

	// Cancel serial numbers that were saved for later.
	app.post('/kiosk/deletesaved', function(req, res) {
		var itemsDeleted;
		if (process.env.ENV === 'dev') {console.log('deleted items saved for later.')};
		if(req.session.hasOwnProperty('saveForLater')) {
			itemsDeleted = (req.session.saveForLater.length > 0) ? {value: true} : {value: false};
		}
		req.session.saveForLater = [];
		res.status(200).send(itemsDeleted);
	});

	app.post('/kiosk/logout', function(req, res) {
		req.session.kiosk.loggedIn = false;
		req.session.saveForLater = [];
		res.end();
	});

	// Adding item to check in/out later after the user logs in.
	app.post('/kiosk/saveforlater', function(req, res) {
		if (!req.session.hasOwnProperty('saveForLater')) {
			req.session.saveForLater = [];
		}

		var sfl = req.session.saveForLater;
		var alreadySaved = false;

		for (var i = 0; i < sfl.length; i++) {
			if (req.body.serial_num === sfl[i].serial_num) {
				alreadySaved = true;
				break;
			}
		}
		if (!alreadySaved) {
			req.session.saveForLater.push({serial_num: req.body.serial_num, checked_in: req.body.checked_in});
		}
		if (process.env.ENV === 'dev') { console.log(req.session.saveForLater); }

		res.status(200).send({
			numItems: req.session.saveForLater.length,
			alreadySaved: alreadySaved
		});
	});

	app.post('/kiosk/submit', function(req, res) {	
		var item_type = [];
		var status = [];
		var items = [];
		var wwid = req.session.kiosk.wwid;
		var serial_nums = req.body.data;
		var total_finished = 0;
		var addr, setting, first_name, last_name, date, user;
		if(req.body.hasOwnProperty("data")) {
	    for(var i=0; i < serial_nums.length; i++) {
	    	pool.getConnection(function(i, err, conn) {
	      	conn.query("CALL scan_item("+ wwid +",'"+serial_nums[i]+"');",
	      		function(error, results, fields) {
	      			if(error) {
	      				throw error;
	      			}
	      			items[i] = {};
	      			items[i].serial_num = serial_nums[i];
	      			items[i].item_type = results[0][0].item_type;
	      			items[i].status = results[0][0].checked_in;
	      			user = results[0][0].user;
	      			total_finished++;

	      			conn.query("CALL get_reservation('"+ serial_nums[i] +"');",
	      				function(error, results, fields) {
	      					for(var j in results[0]) {
		      					if(error) {
		      						throw error;
		      					}
		      					var their_wwid = results[0][0].waiting_user;

		      					conn.query("CALL get_addr("+their_wwid+");",
		      						function(error, results, fields) {
		      							if(error) {
		      								throw error;
		      							}
		      							var their_addr = results[0][0].email_address;
		      							var their_last_name_reservation = results[0][0].last_name;
		      							var their_first_name_reservation = results[0][0].first_name;
		      							var their_date = results[0][0].order_date;

		      							conn.query("CALL get_addr("+wwid+");",
		      								function(error, results, fields) {
		      									if(error) {
		      										throw error;
		      									}
		      									var my_first_name_reservation = results[0][0].first_name;
		      									var my_last_name_reservation = results[0][0].last_name;
		      									console.log("Sending reservation email to "+addr+"...");
														reservationTemplate(their_addr, their_first_name_reservation, their_last_name_reservation,
															my_first_name_reservation, my_last_name_reservation, serial_nums[i], "CPU", status[i], their_date); //TODO: get item_type
														conn.query("CALL delete_reservation('"+serial_nums[i]+"','"+their_wwid+"');",
															function(error, results, fields) {
																if(error) {
																	throw error;
																}
															});
		      								});
		      						});
		      				}
	      				});

	      			if(user != null && user != wwid) {
	      				conn.query("CALL get_addr("+user+");",
	      					function(error, results, fields) {
	      						if(error) {
	      							throw error;
	      						}

										addr = results[0][0].email_address;
										their_last_name = results[0][0].last_name;
										their_first_name = results[0][0].first_name;
										date = results[0][0].order_date;

										conn.query("CALL get_addr("+wwid+");",
											function(error, results, fields) {
												if(error) {
													throw error;
												}
												var my_first_name = results[0][0].first_name;
												var my_last_name = results[0][0].last_name;
												console.log("Sending checkin email to "+addr+"...");
												checkinTemplate(addr, their_first_name, their_last_name, my_first_name, my_last_name, serial_nums[i], item_type[i], status[i], date);
											});
									});
	      			}

	      			if(total_finished === serial_nums.length) {
	      				conn.query("CALL get_addr("+wwid+");",
	      					function(error, results, fields) {
	      						if(error) {
	      							throw error;
	      						}

	      						addr = results[0][0].email_address;
	      						setting = results[0][0].cart_summary_email_setting;
										last_name = results[0][0].last_name;
										first_name = results[0][0].first_name;
										date = results[0][0].order_date;

										if(setting === 1) {
											if (process.env.ENV === 'dev') {
												console.log("Sending cart summary email to "+addr+"...");
											}
											cartTemplate(addr, first_name, last_name, serial_nums, item_type, status, date);
										}
									});
	      				conn.release();
	      				req.session.kiosk.loggedIn = false;
	      				req.session.saveForLater = [];
	      				res.status(200).json(items);
	      			}  
	      		});
	      }.bind(pool, i));
	    }
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
	 				req.session.kiosk = new models.SessionUser();
	 				// We have a user in the AD system. Parse out the wwid.
	 				req.session.kiosk.wwid = body;
	 				next();
	 			} else {
	 				// No wwid found, send user back to login page.
	 				res.redirect('/kiosk');
	 			}
	 		});
	}, function(req,res,next) {
		// We know at this point we have a wwid, so let's try to get the user from our DB.
      	pool.getConnection(function(err, conn) {
			conn.query('CALL get_user_from_wwid('+req.session.kiosk.wwid+')', function(error, results, fields) {
					if (error) {
						throw error;
					}
		 			conn.release();
					
					if (results[0].length === 1) {
		 				req.session.kiosk.last_name = results[0][0].last_name;
		 				req.session.kiosk.first_name = results[0][0].first_name;
		 				req.session.kiosk.is_admin = results[0][0].is_admin;
		 				req.session.kiosk.loggedIn = true;
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
			console.log(req.session.kiosk.wwid);
			console.log(req.session.kiosk.last_name);
			console.log(req.session.kiosk.first_name);
		}
		
		res.redirect('/cart');
	});
};

function enforceLogin(req, res, next) {
	if(req.session.hasOwnProperty("kiosk")) {
		if(req.session.kiosk.loggedIn) {
			next();
		} else {
			res.redirect('/kiosk');
		}
	} else {
		res.redirect('/kiosk');
	}
}
