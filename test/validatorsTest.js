var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var scrub = require('../app/scrubbers');
var validate = require('../app/validators');

var cpu;
var v;
var s;

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

	s = scrub.CPU(cpu);
	v = validate.CPU(s);
});

describe('validate', function() {
	describe('#CPU()', function() {
		it('should have no errors', function(done) {
			expect(v).to.be.undefined;

			done();
		});
		it('should complain about serial number length', function(done) {
			var c = s;
			c.serial_input[1] = 'ThisIsWayTooLong';

			var v2 = validate.CPU(c);
			expect(v2.serial_input).to.be.not.undefined;
			expect(v2.serial_input).to.have.length(1);

			done();
		});
		it('should complain about format', function(done) {
			var c = s;
			c.serial_input.push('@@@@dddd@@@@dd');

			var v3 = validate.CPU(c);
			expect(v3.serial_input).to.be.not.undefined;
			expect(v3.serial_input).to.have.length(1);

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

			var v4 = validate.CPU(c);
			expect(v4.serial_input).to.be.not.undefined;
			expect(v4.spec_input).to.be.not.undefined;
			expect(v4.mm_input).to.be.not.undefined;
			expect(v4.freq_input).to.be.not.undefined;
			expect(v4.step_input).to.be.not.undefined;
			expect(v4.llc_input).to.be.not.undefined;
			expect(v4.cores_input).to.be.not.undefined;
			expect(v4.codename_input).to.be.not.undefined;
			expect(v4.class_input).to.be.not.undefined;
			expect(v4.arch_input).to.be.not.undefined;

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

			var v5 = validate.CPU(c);
			expect(v5.external_input).to.be.undefined;
			expect(v5.notes_input).to.be.undefined;

			done();
		});
	});
});