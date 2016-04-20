module.exports = {
	CPU: function(cpu) {
		return scrubCPU(cpu);
	},
	SSD: function(ssd) {
		return scrubSSD(ssd);
	},
	Memory: function(mem) {
		return scrubMemory(mem);
	},
	Flash: function(flash) {
		return scrubFlash(flash);
	},
	Board: function(board) {
		return scrubBoard(board);
	}
};

// Capitalize each word in a string
String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

// Replace extra spaces between each word, along with leading and trailing whitespaces.
String.prototype.trimWords = function() {
	return this.replace(/\s+/g, " ").trim();
}

function scrubCPU(cpu) {
	// Serial Number
	// 1. Convert to uppercase
	// 2. Split into array based on newline as the delimeter
	// 3. Trim whitespace
	if (cpu.hasOwnProperty('serial_num')) {
		if (cpu.serial_num !== '') {
			cpu.serial_num = cpu.serial_num.toUpperCase().split(/\n/);
			for (var i = 0; i < cpu.serial_num.length; i++) {
				cpu.serial_num[i] = cpu.serial_num[i].trimWords();
			}
		} else {
			cpu.serial_num = [];
		}
	}

	// Spec
	// 1. Convert to uppercase
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('spec')) {
		cpu.spec = cpu.spec.toUpperCase().trimWords();
	}

	// MM
	// 1. Trim whitespace
	if (cpu.hasOwnProperty('mm')) {
		cpu.mm = cpu.mm.trimWords();
	}

	// Frequency
	// 1. Remove trailing zeros from string by converting string to float
	//    (will automatically trim whitespace)
	// 2. Make sure it's in string format
	if (cpu.hasOwnProperty('frequency')) {
		cpu.frequency = parseFloat(cpu.frequency).toString();
	}

	// Stepping
	// 1. Convert to uppercase
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('stepping')) {
		cpu.stepping = cpu.stepping.toUpperCase().trimWords();
	}

	// LLC
	// 1. Trim whitespace and trailing zeros
	if (cpu.hasOwnProperty('llc')) {
		cpu.llc = parseFloat(cpu.llc);
	}

	// Cores
	// 1. Trim whitespace
	// 2. Convert to int
	if (cpu.hasOwnProperty('cores')) {
		cpu.cores = parseInt(cpu.cores.trim());
	}

	// Codename
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('codename')) {
		cpu.codename = cpu.codename.capitalize().trimWords();
	}

	// CPU Class
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('cpu_class')) {
		cpu.cpu_class = cpu.cpu_class.capitalize().trimWords();
	}

	// External Name
	// 1. Capitalize just the first word, since the format may contain abbreviations and numbers. 
	//    Some abbreviations may not want to be capitalized (e.g. i7) so we leave that input up to the user.
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('external_name')) {
		cpu.external_name = cpu.external_name.replace(/(?:^|\s)\S/, function(a) { return a.toUpperCase(); });
		cpu.external_name = cpu.external_name.trimWords();
	}

	// Architecture
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('architecture')) {
		cpu.architecture = cpu.architecture.capitalize().trimWords();
	}

	// Notes
	// 1. Trim leading and trailing whitespace.
	//    (Don't need to trim between words. Let the user decide how to use notes).
	if (cpu.hasOwnProperty('notes')) {
		cpu.notes = cpu.notes.trim();
	}

	return cpu;
}

function scrubSSD(ssd) {
	// Serial Number
	// 1. Convert to uppercase
	// 2. Split into array based on newline as the delimeter
	// 3. Trim whitespace
	if (ssd.hasOwnProperty('serial_num')) {
		if (ssd.serial_num !== '') {
			ssd.serial_num = ssd.serial_num.toUpperCase().split(/\n/);
			for (var i = 0; i < ssd.serial_num.length; i++) {
				ssd.serial_num[i] = ssd.serial_num[i].trimWords();
			}
		} else {
			ssd.serial_num = [];
		}
	}

	// Manufacturer
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (ssd.hasOwnProperty('manufacturer')) {
		ssd.manufacturer = ssd.manufacturer.capitalize().trimWords();
	}

	// Model
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (ssd.hasOwnProperty('model')) {
		ssd.model = ssd.model.capitalize().trimWords();
	}

	// Capacity
	// 1. Trim whitespace
	// 2. Convert to int
	if (ssd.hasOwnProperty('capacity')) {
		ssd.capacity = parseInt(ssd.capacity.trim());
	}

	// Notes
	// 1. Trim leading and trailing whitespace.
	//    (Don't need to trim between words. Let the user decide how to use notes).
	if (ssd.hasOwnProperty('notes')) {
		ssd.notes = ssd.notes.trim();
	}

	return ssd;
}

function scrubMemory(mem) {
	// Serial Number
	// 1. Convert to uppercase
	// 2. Split into array based on newline as the delimeter
	// 3. Trim whitespace
	if (mem.hasOwnProperty('serial_num')) {
		if (mem.serial_num !== '') {
			mem.serial_num = mem.serial_num.toUpperCase().split(/\n/);
			for (var i = 0; i < mem.serial_num.length; i++) {
				mem.serial_num[i] = mem.serial_num[i].trimWords();
			}
		} else {
			mem.serial_num = [];
		}
	}

	// Manufacturer
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (mem.hasOwnProperty('manufacturer')) {
		mem.manufacturer = mem.manufacturer.capitalize().trimWords();
	}

	// Physical Size
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (mem.hasOwnProperty('physical_size')) {
		mem.physical_size = parseInt(mem.physical_size.trim());
	}

	// ECC
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (mem.hasOwnProperty('ecc')) {
		mem.ecc = mem.ecc.capitalize().trimWords();
	}

	// Ranks
	// 1. Trim whitespace
	// 2. Convert to int
	if (mem.hasOwnProperty('ranks')) {
		mem.ranks = parseInt(mem.ranks.trim());
	}

	// Memory Type
	// 1. Convert to uppercase
	// 2. Trim whitespace
	if (mem.hasOwnProperty('memory_type')) {
		mem.memory_type = mem.memory_type.toUpperCase().trimWords();
	}

	// Capacity
	// 1. Trim whitespace
	// 2. Convert to int
	if (mem.hasOwnProperty('capacity')) {
		mem.capacity = parseInt(mem.capacity.trim());
	}

	// Speed
	// 1. Trim whitespace
	// 2. Convert to int
	if (mem.hasOwnProperty('speed')) {
		mem.speed = parseInt(mem.speed.trim());
	}

	// Notes
	// 1. Trim leading and trailing whitespace.
	//    (Don't need to trim between words. Let the user decide how to use notes).
	if (mem.hasOwnProperty('notes')) {
		mem.notes = mem.notes.trim();
	}

	return mem;
}

function scrubFlash(flash) {
	// Serial Number
	// 1. Convert to uppercase
	// 2. Split into array based on newline as the delimeter
	// 3. Trim whitespace
	if (flash.hasOwnProperty('serial_num')) {
		if (flash.serial_num !== '') {
			flash.serial_num = flash.serial_num.toUpperCase().split(/\n/);
			for (var i = 0; i < flash.serial_num.length; i++) {
				flash.serial_num[i] = flash.serial_num[i].trimWords();
			}
		} else {
			flash.serial_num = [];
		}
	}

	// Manufacturer
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (flash.hasOwnProperty('manufacturer')) {
		flash.manufacturer = flash.manufacturer.capitalize().trimWords();
	}

	// Capacity
	// 1. Trim whitespace
	// 2. Convert to int
	if (flash.hasOwnProperty('capacity')) {
		flash.capacity = parseInt(flash.capacity.trim());
	}

	// Notes
	// 1. Trim leading and trailing whitespace.
	//    (Don't need to trim between words. Let the user decide how to use notes).
	if (flash.hasOwnProperty('notes')) {
		flash.notes = flash.notes.trim();
	}

	return flash;
}

function scrubBoard(board) {
	// Serial Number
	// 1. Convert to uppercase
	// 2. Split into array based on newline as the delimeter
	// 3. Trim whitespace
	if (board.hasOwnProperty('serial_num')) {
		if (board.serial_num !== '') {
			board.serial_num = board.serial_num.toUpperCase().split(/\n/);
			for (var i = 0; i < board.serial_num.length; i++) {
				board.serial_num[i] = board.serial_num[i].trimWords();
			}
		} else {
			board.serial_num = [];
		}
	}

	// FPGA
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (board.hasOwnProperty('fpga')) {
		board.fpga = board.fpga.capitalize().trimWords();
	}

	// BIOS
	// 1. Trim whitespace
	if (board.hasOwnProperty('bios')) {
		board.bios = board.bios.trimWords();
	}

	// MAC Address
	// 1. Trim whitespace
	if (board.hasOwnProperty('mac')) {
		board.mac = board.mac.trim();
	}

	// Fab
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (board.hasOwnProperty('fab')) {
		board.fab = board.fab.capitalize().trimWords();
	}

	// Notes
	// 1. Trim leading and trailing whitespace.
	//    (Don't need to trim between words. Let the user decide how to use notes).
	if (board.hasOwnProperty('notes')) {
		board.notes = board.notes.trim();
	}

	return board;
}