var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var scrub = require('../app/scrubbers');
var validate = require('../app/validators');

describe('validate', function() {
	describe('#CPU()', function() {
		var val;
		var scrubbed;
		before(function() {
			var cpu = {
				serial_input: '12345678901234\nabcdefghijklmn  ',
				spec_input: '   ax20v  ',
				mm_input: '  929620   ',
				freq_input: '  2.00   ',
				step_input: '  a4 ',
				llc_input: '  3 ',
				cores_input: '  7   ',
				codename_input: '   sandy   bridge    ',
				class_input: ' mobile   ',
				external_input: '  core   i7-2710qe    ',
				arch_input: '  haswell   ',
				notes_input: '   these   -> @!!!! are some notes!!!    '
			};

			scrubbed = scrub.CPU(cpu);
			val = validate.CPU(scrubbed);
		});
		it('should have no errors', function(done) {
			expect(val).to.be.undefined;

			done();
		});
		it('should complain about serial number length', function(done) {
			var c = scrubbed;
			c.serial_input = ['12345678901234', 'ABCDEFGHIJKLMNO'];

			var v = validate.CPU(c);

			expect(v.serial_input).to.have.length(1);
			expect(v.serial_input[0]).to.contain('ABCDEFGHIJKLMNO');
			expect(v.serial_input[0]).to.contain('length');

			done();
		});
		it('should complain about serial number format', function(done) {
			var c = scrubbed;
			c.serial_input = ['@@@@ABCD@@@@AB', 'ABCDEFGHIJKLMN'];

			var v = validate.CPU(c);

			expect(v.serial_input).to.have.length(1);
			expect(v.serial_input[0]).to.contain('@@@@ABCD@@@@AB');
			expect(v.serial_input[0]).to.contain('alphanumeric');

			done();
		});
		it('should complain about missing parameters', function(done) {
			var c = {
				serial_input: '',
				spec_input: '',
				mm_input: '',
				freq_input: '',
				step_input: '',
				llc_input: '',
				cores_input: '',
				codename_input: '',
				class_input: '',
				external_input: '',
				arch_input: '',
				notes_input: ''
			};

			var v = validate.CPU(c);
			expect(v.serial_input).to.be.not.undefined;
			expect(v.spec_input).to.be.not.undefined;
			expect(v.mm_input).to.be.not.undefined;
			expect(v.freq_input).to.be.not.undefined;
			expect(v.step_input).to.be.not.undefined;
			expect(v.llc_input).to.be.not.undefined;
			expect(v.cores_input).to.be.not.undefined;
			expect(v.codename_input).to.be.not.undefined;
			expect(v.class_input).to.be.not.undefined;
			expect(v.arch_input).to.be.not.undefined;

			done();
		});

		it ('should be fine with no values for optional attributes', function(done) {
			var c = {
				serial_input: '',
				spec_input: '',
				mm_input: '',
				freq_input: '',
				step_input: '',
				llc_input: '',
				cores_input: '',
				codename_input: '',
				class_input: '',
				external_input: '',
				arch_input: '',
				notes_input: ''
			};

			var v = validate.CPU(c);
			expect(v.external_input).to.be.undefined;
			expect(v.notes_input).to.be.undefined;

			done();
		});
	});
	describe('#SSD()', function() {
		var val;
		var scrubbed;
		before(function() {
			var ssd = {
				serial_input: '1234567890123456\nabcdefghijklmnop  ',
				manufacturer_input: '  lexar and intel    why not    ',
				model_input: '  sr508v    ',
				capacity_input: '  38   ',
				notes_input: '   here a  have      some notes!!!     '
			};

			scrubbed = scrub.SSD(ssd);
			val = validate.SSD(scrubbed);
		});
		it('should have no errors', function(done) {
			expect(val).to.be.undefined;

			done();
		});
		it('should complain about serial number length', function(done) {
			var c = scrubbed;
			c.serial_input = ['1234567890123456', 'ABCDEFGHIJKLMNOPQRS'];

			var v = validate.SSD(c);

			expect(v.serial_input).to.have.length(1);
			expect(v.serial_input[0]).to.contain('ABCDEFGHIJKLMNOPQRS');
			expect(v.serial_input[0]).to.contain('length');

			done();
		});
		it('should complain about serial number format', function(done) {
			var c = scrubbed;
			c.serial_input = ['@@@@ABCD@@@@AB', 'ABCDEFGHIJKLMN'];

			var v = validate.SSD(c);

			expect(v.serial_input).to.have.length(1);
			expect(v.serial_input[0]).to.contain('@@@@ABCD@@@@AB');
			expect(v.serial_input[0]).to.contain('alphanumeric');

			done();
		});
		it('should complain about missing parameters', function(done) {
			var c = {
				serial_input: '',
				manufacturer_input: '',
				model_input: '',
				capacity_input: '',
				notes_input: ''
			};

			var v = validate.SSD(c);
			expect(v.serial_input).to.be.not.undefined;
			expect(v.manufacturer_input).to.be.not.undefined;
			expect(v.model_input).to.be.not.undefined;
			expect(v.capacity_input).to.be.not.undefined;

			done();
		});

		it ('should be fine with no values for optional attributes', function(done) {
			var c = {
				serial_input: '',
				manufacturer_input: '',
				model_input: '',
				capacity_input: '',
				notes_input: ''
			};

			var v = validate.SSD(c);
			expect(v.notes_input).to.be.undefined;

			done();
		});
	});
	describe('#Memory()', function() {
		var val;
		var scrubbed;
		before(function() {
			var memory = {
				serial_input: '12345678901234567890\nabcdefghijklmnopqrst  ',
				manufacturer_input: '  lexar and intel    why not    ',
				physical_size_input: '  123   ',
				ecc_input: '   yes',
				ranks_input: '  3   ',
				memory_type_input: '  dDr4    ',
				capacity_input: '  38   ',
				speed_input: '  2048   ',
				notes_input: '   here a  have      some notes!!!     '
			};

			scrubbed = scrub.Memory(memory);
			val = validate.Memory(scrubbed);
		});
		it('should have no errors', function(done) {
			expect(val).to.be.undefined;

			done();
		});
		it('should complain about serial number length', function(done) {
			var c = scrubbed;
			c.serial_input = ['1234567890123456', 'ABCDEFGHIJKLMNOPQRSTU'];

			var v = validate.Memory(c);

			expect(v.serial_input).to.have.length(1);
			expect(v.serial_input[0]).to.contain('ABCDEFGHIJKLMNOPQRSTU');
			expect(v.serial_input[0]).to.contain('length');

			done();
		});
		it('should complain about serial number format', function(done) {
			var c = scrubbed;
			c.serial_input = ['@@@@ABCD@@@@AB', 'ABCDEFGHIJKLMN'];

			var v = validate.Memory(c);

			expect(v.serial_input).to.have.length(1);
			expect(v.serial_input[0]).to.contain('@@@@ABCD@@@@AB');
			expect(v.serial_input[0]).to.contain('alphanumeric');

			done();
		});
		it('should complain about missing parameters', function(done) {
			var c = {
				serial_input: '',
				manufacturer_input: '',
				physical_size_input: '',
				ecc_input: '',
				ranks_input: '',
				memory_type_input: '',
				capacity_input: '',
				speed_input: '',
				notes_input: ''
			};

			var v = validate.Memory(c);
			expect(v.serial_input).to.be.not.undefined;
			expect(v.manufacturer_input).to.be.not.undefined;
			expect(v.physical_size_input).to.be.not.undefined;
			expect(v.ecc_input).to.be.not.undefined;
			expect(v.ranks_input).to.be.not.undefined;
			expect(v.memory_type_input).to.be.not.undefined;
			expect(v.capacity_input).to.be.not.undefined;
			expect(v.speed_input).to.be.not.undefined;

			done();
		});

		it ('should be fine with no values for optional attributes', function(done) {
			var c = {
				serial_input: '',
				manufacturer_input: '',
				physical_size_input: '',
				ecc_input: '',
				ranks_input: '',
				memory_type_input: '',
				capacity_input: '',
				speed_input: '',
				notes_input: ''
			};

			var v = validate.Memory(c);
			expect(v.notes_input).to.be.undefined;

			done();
		});
	});
	describe('#Flash Drives()', function() {
		var val;
		var scrubbed;
		before(function() {
			var flash = {
				serial_input: '1234567890123456\nabcdefghijklmnop  ',
				manufacturer_input: '  lexar and intel    why not    ',
				capacity_input: '  38   ',
				notes_input: '   here a  have      some notes!!!     '
			};

			scrubbed = scrub.Flash(flash);
			val = validate.Flash(scrubbed);
		});
		it('should have no errors', function(done) {
			expect(val).to.be.undefined;

			done();
		});
		it('should complain about serial number length', function(done) {
			var c = scrubbed;
			c.serial_input = ['1234567890123456', 'ABCDEFGHIJKLMNOPQRSTU'];

			var v = validate.Flash(c);

			expect(v.serial_input).to.have.length(1);
			expect(v.serial_input[0]).to.contain('ABCDEFGHIJKLMNOPQRSTU');
			expect(v.serial_input[0]).to.contain('length');

			done();
		});
		it('should complain about serial number format', function(done) {
			var c = scrubbed;
			c.serial_input = ['@@@@ABCD@@@@AB', 'ABCDEFGHIJKLMN'];

			var v = validate.Flash(c);

			expect(v.serial_input).to.have.length(1);
			expect(v.serial_input[0]).to.contain('@@@@ABCD@@@@AB');
			expect(v.serial_input[0]).to.contain('alphanumeric');

			done();
		});
		it('should complain about missing parameters', function(done) {
			var c = {
				serial_input: '',
				manufacturer_input: '',
				capacity_input: '',
				notes_input: ''
			};

			var v = validate.Flash(c);
			expect(v.serial_input).to.be.not.undefined;
			expect(v.manufacturer_input).to.be.not.undefined;
			expect(v.capacity_input).to.be.not.undefined;

			done();
		});

		it ('should be fine with no values for optional attributes', function(done) {
			var c = {
				serial_input: '',
				manufacturer_input: '',
				capacity_input: '',
				notes_input: ''
			};

			var v = validate.Flash(c);
			expect(v.notes_input).to.be.undefined;

			done();
		});
	});
});