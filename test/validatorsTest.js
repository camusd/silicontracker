var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var scrub = require('../app/scrubbers');
var validate = require('../app/validators');

var cpu;
var val;
var scrubbed;

before(function() {
	cpu = {
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

describe('validate', function() {
	describe('#CPU()', function() {
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
});