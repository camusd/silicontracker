var validate = require('validate.js');
module.exports = {
	CPU: function(cpu) {
		var val = validate(cpu, CPUConstraints);
		var serial = verifyCPUSerial(cpu);

		if (typeof val !== 'undefined' && typeof serial !== 'undefined') {
			return mergeResults(val, serial);
		} else if (typeof val === 'undefined') {
			return serial;
		} else {
			return val;
		}
	}
};

// Checks every serial number for the correct formats
function verifyCPUSerial(cpu) {
	var results = {};
	if (cpu.serial_input.length === 0) {
		results = {serial_input: [attrNames.serial_input + ' is required.']};
	}
	for (var i = 0; i < cpu.serial_input.length; i++) {
		var c = {serial_input: cpu.serial_input[i]};
		var v = validate(c, SerialCPUContstraints);

		if (v && results.hasOwnProperty('serial_input')) {
			results.serial_input.concat(v.serial_input);
		} else if (v && !results.hasOwnProperty('serial_input')) {
			results.serial_input = v.serial_input;
		}
	}

	if (results.serial_input) {
		return results;
	}
	return;
}

// Merges two objects together
function mergeResults(obj1, obj2) {
	var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}

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


var SerialCPUContstraints = {
	serial_input: {
		length: {
			is: 14,
			message: 'must each be 14 characters in length.'
		},
		format: {
			pattern: /[a-zA-Z0-9]+/,
			message: 'must be alphanumeric (letters and numbers).'
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
