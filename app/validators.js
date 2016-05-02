// How to use the validator: validatejs.org

var validate = require('validate.js');
module.exports = {
	CPU: function(cpu) {
		var val = validate(cpu, CPUConstraints);

		// checking each serial_num number
		for (var i = 0; i < cpu.serial_num.length; i++) {
			var toValidate = {serial_num: cpu.serial_num[i]}
			var v = validate(toValidate, CPUSerialConstraints);
			if (v) {
				// checking if any errors at all (if undefined or null)
				if (val != null) {
					// checking if any errors yet for serial_num numbers
					if (val.hasOwnProperty('serial_num')) {
						// push each serial_num number error
						for (var j = 0; j < v.serial_num.length; j++) {
							val.serial_num.push(v.serial_num[j]);
						}
					} else {
						val.serial_num = v.serial_num;
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

		// checking each serial_num number
		for (var i = 0; i < ssd.serial_num.length; i++) {
			var toValidate = {serial_num: ssd.serial_num[i]}
			var v = validate(toValidate, SSDSerialConstraints);
			if (v) {
				// checking if any errors at all (if undefined or null)
				if (val != null) {
					// checking if any errors yet for serial_num numbers
					if (val.hasOwnProperty('serial_num')) {
						// push each serial_num number error
						for (var j = 0; j < v.serial_num.length; j++) {
							val.serial_num.push(v.serial_num[j]);
						}
					} else {
						val.serial_num = v.serial_num;
					}	
				} else {
					// if validate value is undefined, start new set of errors
					val = v;
				}
			}
		}

		return val;
	},
	Memory: function(mem) {
		var val = validate(mem, MemoryConstraints);

		// checking each serial_num number
		for (var i = 0; i < mem.serial_num.length; i++) {
			var toValidate = {serial_num: mem.serial_num[i]}
			var v = validate(toValidate, MemorySerialConstraints);
			if (v) {
				// checking if any errors at all (if undefined or null)
				if (val != null) {
					// checking if any errors yet for serial_num numbers
					if (val.hasOwnProperty('serial_num')) {
						// push each serial_num number error
						for (var j = 0; j < v.serial_num.length; j++) {
							val.serial_num.push(v.serial_num[j]);
						}
					} else {
						val.serial_num = v.serial_num;
					}	
				} else {
					// if validate value is undefined, start new set of errors
					val = v;
				}
			}
		}

		return val;
	},
	Flash: function(flash) {
		var val = validate(flash, FlashConstraints);

		// checking each serial_num number
		for (var i = 0; i < flash.serial_num.length; i++) {
			var toValidate = {serial_num: flash.serial_num[i]}
			var v = validate(toValidate, FlashSerialConstraints);
			if (v) {
				// checking if any errors at all (if undefined or null)
				if (val != null) {
					// checking if any errors yet for serial_num numbers
					if (val.hasOwnProperty('serial_num')) {
						// push each serial_num number error
						for (var j = 0; j < v.serial_num.length; j++) {
							val.serial_num.push(v.serial_num[j]);
						}
					} else {
						val.serial_num = v.serial_num;
					}	
				} else {
					// if validate value is undefined, start new set of errors
					val = v;
				}
			}
		}

		return val;
	},
	Board: function(board) {
		var val = validate(board, BoardConstraints);

		// checking each serial_num number
		for (var i = 0; i < board.serial_num.length; i++) {
			var toValidate = {serial_num: board.serial_num[i]}
			var v = validate(toValidate, BoardSerialConstraints);
			if (v) {
				// checking if any errors at all (if undefined or null)
				if (val != null) {
					// checking if any errors yet for serial_num numbers
					if (val.hasOwnProperty('serial_num')) {
						// push each serial_num number error
						for (var j = 0; j < v.serial_num.length; j++) {
							val.serial_num.push(v.serial_num[j]);
						}
					} else {
						val.serial_num = v.serial_num;
					}	
				} else {
					// if validate value is undefined, start new set of errors
					val = v;
				}
			}
		}

		return val;
	},
};

var attrNames = {
	// CPU
	serial_num: 	'Serial Number',
	spec: 	'Spec',
	mm: 		'MM',
	frequency: 	'Frequency',
	stepping: 	'Stepping',
	llc: 		'LLC',
	cores: 	'Cores',
	codename:	'Codename',
	cpu_class: 	'Class',
	external_name:	'External Name',
	architecture:		'Architecture',
	notes: 	'Notes',

	// SSD
	capacity: 	'Capacity',
	manufacturer:	'Manufacturer',
	model:		'Model',

	// Memory
	physical_size: 	'Physical Size',
	memory_type: 		'Type',
	speed: 			'Speed',
	ecc: 				'ECC',
	ranks: 			'Ranks',
	
	// Flash Drives

	// Boards
	fpga: 'FPGA',
	bios: 'BIOS',
	mac: 'MAC Address',
	fab: 'Fab',

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
	serial_num: {
		length: {
			maximum: 14,
			message: '^%{value} must be less than 14 characters in length.'
		},
		format: {
			pattern: /[a-zA-Z0-9]+/,
			message: '^%{value} must be alphanumeric (letters and numbers).'
		}
	}
}

var CPUConstraints = {
	//Serial Number
	serial_num: {
		presence: true
	},
	// Spec
	spec: {
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
	mm: {
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
	frequency: {
		presence: true,
		numericality: {
			greaterThan: 0
		}
	},
	// Stepping
	stepping: {
		presence: true,
		length: {
			maximum: 6
		}
	},
	// LLC
	llc: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	// Cores
	cores: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	// Codename
	codename: {
		presence: true,
		length: {
			maximum: 25
		}
	},
	// CPU Class
	cpu_class: {
		presence: true,
		length: {
			maximum: 10
		}
	},
	// External Name
	external_name: {
		length: {
			maximum: 25
		}
	},
	// Architecture
	architecture: {
		presence: true,
		length: {
			maximum: 25
		}
	},
	// Notes
	notes: {

	}
};

var SSDSerialConstraints = {
	serial_num: {
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
	serial_num: {
		presence: true
	},
	// Capacity
	capacity: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	// Manufacturer
	manufacturer: {
		presence: true,
		length: {
			maximum: 45
		}
	},
	// Model
	model: {
		presence: true,
		length: {
			maximum: 15
		}
	},
	// Notes
	notes: {

	}
};

var MemorySerialConstraints = {
	serial_num: {
		length: {
			maximum: 20,
			message: '^%{value} must be 20 characters or less in length.'
		},
		format: {
			pattern: /[a-zA-Z0-9]+/,
			message: '^%{value} must be alphanumeric (letters and numbers).'
		}
	}
};

var MemoryConstraints = {
	// Serial Number
	serial_num: {
		presence: true
	},
	// Manufacturer
	manufacturer: {
		presence: true,
		length: {
			maximum: 45
		}
	},
	// Physical Size
	physical_size: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	// ECC
	ecc: {
		presence: true,
		inclusion: {
			within: ['Yes', 'No']
		}
	},
	// Ranks
	ranks: {
		presence: true,
		numericality: {
			onlyInteger: true
		}
	},
	// Memory Type
	memory_type: {
		presence: true,
		length: {
			maximum: 12
		}
	},
	// Capacity
	capacity: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	// Speed
	speed: {
		presence: true,
		numericality: {
			greaterThan: 0
		}
	},
	// Notes
	notes: {

	}
};

var FlashSerialConstraints = {
	serial_num: {
		length: {
			maximum: 20,
			message: '^%{value} must be 20 characters or less in length.'
		},
		format: {
			pattern: /[a-zA-Z0-9]+/,
			message: '^%{value} must be alphanumeric (letters and numbers).'
		}
	}
};

var FlashConstraints = {
	// Serial Number
	serial_num: {
		presence: true
	},
	// Manufacturer
	manufacturer: {
		presence: true,
		length: {
			maximum: 45
		}
	},
	// Capacity
	capacity: {
		presence: true,
		numericality: {
			onlyInteger: true,
			greaterThan: 0
		}
	},
	// Notes
	notes: {

	}
};

var BoardSerialConstraints = {
	serial_num: {
		length: {
			maximum: 20,
			message: '^%{value} must be 16 characters or less in length.'
		},
		format: {
			pattern: /[a-zA-Z0-9]+/,
			message: '^%{value} must be alphanumeric (letters and numbers).'
		}
	}
}

var BoardConstraints = {
	// Serial Number
	serial_num: {
		presence: true
	},
	// FPGA
	fpga: {
		length: {
			maximum: 30
		}
	},
	// BIOS
	bios: {
		length: {
			maximum: 75
		}
	},
	// MAC Address
	mac: {
		length: {
			maximum: 17
		}
	},
	fab: {
		length: {
			maximum: 10
		}
	},
	// Notes
	notes: {
	}
};