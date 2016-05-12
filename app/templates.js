var nodemailer = require('nodemailer');
require('../env.js');

module.exports = function() {
	this.reminderTemplate = function(addr, first_name, last_name, item_serial, item_type, time) {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD
			}
		});
		var intro = "Hello "+first_name+" "+last_name+",\n\n"
		          +"This is an automated message from the Silicon Tracker"
		          +" Service reminding you that you have had the following"
		          +" items checked awhile.\n\n";

		var order = "";
		for(var i in item_serial) {
			order = order+"Serial number: "+item_serial[i]+"	|	Type: "+item_type[i]+"	|	Days checked out: "+time[i]+"\n";
		}

		var outro = "\nIf you are no longer using these items, please return them at"
		          +" your earliest convinence.\n";

		var mailOptions = {
			from: process.env.EMAIL_USER,
			to: addr,
			subject: "[Si-Tracker] Silicon Tracker Reminder",
			text: intro+order+outro
		};
		transporter.sendMail(mailOptions, function(error, info){
			if(error) {
				console.log(error);
			} else {
				console.log('Message send: ' + info.response);
			};
		});
	};

	this.cartTemplate = function(addr, first_name, last_name, item_serial, item_type, status, date) {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD
			}
		});
		var intro = "Hello "+first_name+" "+last_name+",\n\n"
		          +"This is an automated message from the Silicon Tracker"
		          +" Service.  Here is a summary of your order from "+date+":\n\n";
		var order = "";
		var checked = 'in';
		for(var i in item_serial) {
			if(status[i] == 1) {
				checked = 'in';
			} else {
				checked = 'out';
			}
			order = order+"Serial number: "+item_serial[i]+"	|	Type: "+item_type[i]+"	|	Status: checked "+checked+"\n"; 
		}
		var mailOptions = {
			from: process.env.EMAIL_USER,
			to: addr,
			subject: "[Si-Tracker] Silicon Tracker Checkout Summary",
			text: intro+order
		};
		transporter.sendMail(mailOptions, function(error, info){
			if(error) {
				console.log(error);
			} else {
				console.log('Message send: ' + info.response);
			};
		});
	};

	this.checkinTemplate = function(addr, owner_first_name, owner_last_name, user_first_name, user_last_name, item_serial, item_type, status, date) {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD
			}
		});
		var intro = "Hello "+owner_first_name+" "+owner_last_name+",\n\n"
		          +"This is an automated message from the Silicon Tracker"
		          +" Service.  The following item checked out in your name has been checked in by "+user_first_name+ " "+user_last_name+" on "+date+":\n\n";

		var order = "Serial number: "+item_serial+"	|	Type: "+item_type+"\n"; 

		var mailOptions = {
			from: process.env.EMAIL_USER,
			to: addr,
			subject: "[Si-Tracker] Silicon Tracker Item Notification",
			text: intro+order
		};
		transporter.sendMail(mailOptions, function(error, info){
			if(error) {
				console.log(error);
			} else {
				console.log('Message send: ' + info.response);
			};
		});
	};
};