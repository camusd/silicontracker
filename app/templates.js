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
		var text = "Hello "+first_name+" "+last_name+",\n\n"
		          +"This is an automated message from the Silicon Tracker"
		          +" Service informing you that you have had the "+item_type
		          +" with serial number: "+item_serial+" checked out for "+time+" days."
		          +" If you are no longer using this "+item_type+", please return it at"
		          +" your earliest convinence.";
		var mailOptions = {
			from: process.env.EMAIL_USER,
			to: addr,
			subject: "Silicon Tracker checkout reminder",
			text: text
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
		          +" Service.  Here is a summary of your order from"+date+":\n\n";
		var order = "";
		var checked = 'in';
		for(var i in item_serial) {
			if(status[i] == 1) {
				checked = 'in';
			} else {
				checked = 'out';
			}
			order = order+"Serial number: "+item_serial+" Type: "+item_type+" Status: checked "+checked+"\n"; 
		}
		var mailOptions = {
			from: process.env.EMAIL_USER,
			to: addr,
			subject: "Silicon Tracker checkout reminder",
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