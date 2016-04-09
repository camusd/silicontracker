module.exports = {
	CPU: function(cpu) {
		return scrubCPU(cpu)
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
	if (cpu.hasOwnProperty('serial_input')) {
		cpu.serial_input = cpu.serial_input.toUpperCase().split(/\n/);
		for (var i = 0; i < cpu.serial_input.length; i++) {
			cpu.serial_input[i] = cpu.serial_input[i].trimWords();
		}
	}

	// Spec
	// 1. Convert to uppercase
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('spec_input')) {
		cpu.spec_input = cpu.spec_input.toUpperCase().trimWords();
	}

	// MM
	// 1. Trim whitespace
	if (cpu.hasOwnProperty('mm_input')) {
		cpu.mm_input = cpu.mm_input.trimWords();
	}

	// Frequency
	// 1. Remove trailing zeros from string by converting string to float
	//    (will automatically trim whitespace)
	// 2. Make sure it's in string format
	if (cpu.hasOwnProperty('freq_input')) {
		cpu.freq_input = parseFloat(cpu.freq_input).toString();
	}

	// Stepping
	// 1. Convert to uppercase
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('step_input')) {
		cpu.step_input = cpu.step_input.toUpperCase().trimWords();
	}

	// LLC
	// 1. Trim whitespace
	if (cpu.hasOwnProperty('llc_input')) {
		cpu.llc_input = parseFloat(cpu.llc_input);
	}

	// Cores
	// 1. Trim whitespace
	if (cpu.hasOwnProperty('cores_input')) {
		cpu.cores_input = parseInt(cpu.cores_input.trim());
	}

	// Codename
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('codename_input')) {
		cpu.codename_input = cpu.codename_input.capitalize().trimWords();
	}

	// CPU Class
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('class_input')) {
		cpu.class_input = cpu.class_input.capitalize().trimWords();
	}

	// External Name
	// 1. Capitalize just the first word, since the format may contain abbreviations and numbers. 
	//    Some abbreviations may not want to be capitalized (e.g. i7) so we leave that input up to the user.
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('external_input')) {
		cpu.external_input = cpu.external_input.replace(/(?:^|\s)\S/, function(a) { return a.toUpperCase(); });
		cpu.external_input = cpu.external_input.trimWords();
	}

	// Architecture
	// 1. Capitalize each word
	// 2. Trim whitespace
	if (cpu.hasOwnProperty('arch_input')) {
		cpu.arch_input = cpu.arch_input.capitalize().trimWords();
	}

	// Notes
	// 1. Trim leading and trailing whitespace.
	//    (Don't need to trim between words. Let the user decide how to use notes).
	if (cpu.hasOwnProperty('notes_input')) {
		cpu.notes_input = cpu.notes_input.trim();
	}

	return cpu;
}