var schedule = require('node-schedule');
var rootdir = process.env.ROOT_DIR;
var request = require('request');

module.exports = function(app, conn) {
		 /* Routes for loading pages in the kiosk interface */
	app.get('/cart', function(req, res) {
	 	res.sendFile(rootdir + '/public/kiosk/cart.html');
	});

	app.get('/kiosk', function(req, res) {
		res.sendFile(rootdir + '/public/kiosk/kiosk.html');
	});

	 /* Getters for json data on items in the kiosk */
	app.get('/serial/:serial', function(req, res) {
	 	var serial = req.params.serial;
	 	// TODO: Put in Stored Procedure
	 	conn.query('SELECT * FROM Processor WHERE Processor.serial_num = \'' + serial + '\'',
	 		function(error, results, fields){
	 			if(error) {
	 				throw error;
	 			}
	 			var a = [];
	 			for (var i in results) {
	 			a.push(new models.CPU(results[i].serial_num, results[i].spec, results[i].mm, 
	 				results[i].frequency, results[i].stepping, results[i].llc, results[i].cores,
	 				results[i].codename, results[i].cpu_class, results[i].external_name, results[i].architecture,
	 				results[i].user, results[i].checked_in, results[i].notes));
	 			};
	 			res.send(a);
	 		});
	});

	/* Posts on the kiosk */
	app.post('/kiosk/submit', function(req, res) {
	 	 for(var i in req.body.val_array) {
	 	 	conn.query("CALL scan_cpu('"+req.body.user+"','"+req.body.val_array[i]+"');")
	 	 }
	 	res.redirect('/kiosk');
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
	 			} else {
	 				// No wwid found, erase current session and create new session for user.
	 				req.session.regenerate();
	 				res.redirect('/kiosk');
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
					res.redirect('/kiosk');
				}
				next();
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
	/* Testing some email scheduling */

	// TODO: create a stored procedure that gets the
	// email address, owner name, serial number, item type,
	// and amount of time since checkout of an item.

	// TODO: don't forget to add cronjob to {}

	var j = schedule.scheduleJob({}, function() {
		conn.query("CALL get_checkout();",
			function(error, results, fields) {
				if(error) {
					throw error;
				}
				for(var i in results[0]) {
					var addr = results[0][i].email_address;
					var first_name = results[0][i].first_name;
					var last_name = results[0][i].last_name;
					var item_serial = results[0][i].serial_num;
					var item_type = results[0][i].item_type;
					var days = results[0][i].days;
					console.log("Sending reminder email to "+addr+"...");
					reminderTemplate(addr, first_name, last_name, item_serial, item_type, days);
				}
			});
	});
};