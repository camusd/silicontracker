var validate = require('validate.js');
module.exports = {
	CPU: function(cpu) {
		var val = validate(cpu, CPUConstraints);

		// checking each serial number
		for (var i = 0; i < cpu.serial_input.length; i++) {
			var toValidate = {serial_input: cpu.serial_input[i]}
			var v = validate(toValidate, CPUSerialConstraints);
			if (v) {
				// checking if any errors at all (if undefined or null)
				if (val != null) {
					// checking if any errors yet for serial numbers
					if (val.hasOwnProperty('serial_input')) {
						// push each serial number error
						for (var j = 0; j < v.serial_input.length; j++) {
							val.serial_input.push(v.serial_input[j]);
						}
					} else {
						val.serial_input = v.serial_input;
					}	
				} else {
					// if validate value is undefined, start new set of errors
					val = v;
				}
			}
		}

		return val;
	},
	SSD: function(ssd) {
		var val = validate(ssd, SSDConstraints);

		// checking each serial number
		for (var i = 0; i < ssd.serial_input.length; i++) {
			var toValidate = {serial_input: ssd.serial_input[i]}
			var v = validate(toValidate, SSDSerialConstraints);
			if (v) {
				// checking if any errors at all (if undefined or null)
				if (val != null) {
					// checking if any errors yet for serial numbers
					if (val.hasOwnProperty('serial_input')) {
						// push each serial number error
						for (var j = 0; j < v.serial_input.length; j++) {
							val.serial_input.push(v.serial_input[j]);
						}
					} else {
						val.serial_input = v.serial_input;
					}	
				} else {
					// if validate value is undefined, start new set of errors
					val = v;
				}
			}
		}

		return val;
	}
};

var attrNames = {
	// CPU
	serial_input: 	'Serial Number',
	spec_input: 	'Spec',
	mm_input: 		'MM',
	freq_input: 	'Frequency',
	step_input: 	'Stepping',
	llc_input: 		'LLC',
	cores_input: 	'Cores',
	codename_input:	'Codename',
	class_input: 	'Class',
	external_input:	'External Name',
	arch_input:		'Architecture',
	notes_input: 	'Notes',

	// SSD
	capacity_input: 	'Capacity',
	manufacturer_input:	'Manufacturer',
	model_input:		'Model',
	
	// Other
	greaterThan: 			'greater than',
	greaterThanOrEqualTo: 	'greater than or equal to',
	equalTo: 				'equal to',
	lessThan: 				'less than',
	lessThanOrEqualTo: 		'less than or equal to'
};

// Override prettify to be just a key-value finder.
validate.prettify = function(str) {
	for (var key in attrNames) {
		if (str === key) {
			return attrNames[key];
		}
	}
	return str;
}

// Overriding the precense message.
validate.validators.presence.message = "is required";

var CPUSerialConstraints = {
	serial_input: {
		length: {
			is: 14,
			message: '^%{value} must be 14 characters in length.'
		},
		format: {
			pattern: /[a-zA-Z0-9]+/,
			message: '^%{value} must be alphanumeric (letters and numbers).'
		}
	}
}

var CPUConstraints = {
	//Serial Number
	serial_input: {
		presence: true
	},
	// Spec
	spec_input: {
		presence: true,
		length: {
			maximum: 5
		},
		format: {
			pattern: /[a-zA-Z0-9]+/,
			message: 'must be alphanumeric (letters and numbers).'
		}

	},
	// MM
	mm_input: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 9999
		},
		length: {
			maximum: 7
		}
	},
	// Frequency
	freq_input: {
		presence: true,
		numericality: {
			greaterThan: 0
		}
	},
	// Stepping
	step_input: {
		presence: true,
		length: {
			maximum: 6
		}
	},
	// LLC
	llc_input: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	// Cores
	cores_input: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	// Codename
	codename_input: {
		presence: true,
		length: {
			maximum: 25
		}
	},
	// CPU Class
	class_input: {
		presence: true,
		length: {
			maximum: 10
		}
	},
	// External Name
	external_input: {
		length: {
			maximum: 25
		}
	},
	// Architecture
	arch_input: {
		presence: true,
		length: {
			maximum: 25
		}
	},
	// Notes
	notes_input: {

	}
};

var SSDSerialConstraints = {
	serial_input: {
		length: {
			maximum: 16,
			message: '^%{value} must be 16 characters or less in length.'
		},
		format: {
			pattern: /[a-zA-Z0-9]+/,
			message: '^%{value} must be alphanumeric (letters and numbers).'
		}
	}
}

var SSDConstraints = {
	// Serial Number
	serial_input: {
		presence: true
	},
	// Capacity
	capacity_input: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	// Manufacturer
	manufacturer_input: {
		presence: true,
		length: {
			maximum: 45
		}
	},
	// Model
	model_input: {
		presence: true,
		length: {
			maximum: 15
		}
	},
	// Notes
	notes_input: {

	}
};