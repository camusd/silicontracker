var assert = require('assert');
var scrub = require('../app/scrubbers');
var chai = require('chai');
var expect = chai.expect;

var cpu;
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
});

describe('scrub', function() {
	describe('#CPU()', function() {
		it('should have correct types', function(done) {

			expect(s, 'the whole thing').to.be.an('object');
			expect(s.serial_input, 'serial_input').to.be.an('array');
			expect(s.spec_input, 'spec_input').to.be.a('string');
			expect(s.mm_input, 'mm_input').to.be.a('string');
			expect(s.freq_input, 'freq_input').to.be.a('string');
			expect(s.step_input, 'step_input').to.be.a('string');
			expect(s.llc_input, 'llc_input').to.be.a('number');
			expect(s.cores_input, 'cores_input').to.be.a('number');
			expect(s.codename_input, 'codename_input').to.be.a('string');
			expect(s.class_input, 'class_input').to.be.a('string');
			expect(s.external_input, 'external_input').to.be.a('string');
			expect(s.arch_input, 'arch_input').to.be.a('string');
			expect(s.notes_input, 'notes_input').to.be.a('string');

			done();
		});
		it('should have two items in the serial_input array', function(done) {
			expect(s.serial_input).to.have.length(2);
			done();
		});
		it('should all contain the right lengths', function(done) {
			expect(s.serial_input[0]).to.have.length(14);
			expect(s.serial_input[1]).to.have.length(14);
			expect(s.spec_input).to.have.length(5);
			expect(s.mm_input).to.have.length(6);
			expect(s.freq_input).to.have.length(1);
			expect(s.step_input).to.have.length(2);
			expect(s.codename_input).to.have.length(12);
			expect(s.class_input).to.have.length(6);
			expect(s.arch_input).to.have.length(7);

			done();
		});
		it('should have the right numbers', function(done) {
			expect(s.llc_input).to.equal(3);
			expect(s.cores_input).to.equal(7);

			done();
		});
		it('should contain correct values', function(done) {
			expect(s.serial_input[0], 'serial_input[0]').to.equal('12345678901234');
			expect(s.serial_input[1], 'serial_input[1]').to.equal('ABCDEFGHIJKLMN');
			expect(s.spec_input, 'spec_input').to.equal('AX20V');
			expect(s.freq_input, 'freq_input').to.equal('2');
			expect(s.step_input, 'step_input').to.equal('A4');
			expect(s.codename_input, 'codename_input').to.equal('Sandy Bridge');
			expect(s.class_input, 'class_input').to.equal('Mobile');
			expect(s.external_input, 'external_input').to.equal('Core i7-2710qe');
			expect(s.arch_input, 'arch_input').to.equal('Haswell');
			expect(s.notes_input, 'notes_input').to.equal('these   -> @!!!! are some notes!!!');

			done();
		});
	});
});