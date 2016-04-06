var validate = require('validate.js');
module.exports = {
	CPU: function(cpu) {
		return validate(cpu, CPUConstraints);
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

var CPUConstraints = {
	// Serial Number
	serial_input: {
		presence: true,
		length: {
			is: 14,
			message: '%{value} is the wrong length (should be 14 characters).'
		},
		format: {
			pattern: /[a-zA-Z0-9]+/,
			message: 'must be alphanumeric (letters and numbers).'
		}
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
