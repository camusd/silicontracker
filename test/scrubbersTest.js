var assert = require('assert');
var scrub = require('../app/scrubbers');
var chai = require('chai');
var expect = chai.expect;

describe('scrub', function() {
	describe('#CPU()', function() {
		var scrubCPU;
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

			scrubCPU = scrub.CPU(cpu);
		});
		it('should have correct types', function(done) {

			expect(scrubCPU, 'the whole thing').to.be.an('object');
			expect(scrubCPU.serial_input, 'serial_input').to.be.an('array');
			expect(scrubCPU.spec_input, 'spec_input').to.be.a('string');
			expect(scrubCPU.mm_input, 'mm_input').to.be.a('string');
			expect(scrubCPU.freq_input, 'freq_input').to.be.a('string');
			expect(scrubCPU.step_input, 'step_input').to.be.a('string');
			expect(scrubCPU.llc_input, 'llc_input').to.be.a('number');
			expect(scrubCPU.cores_input, 'cores_input').to.be.a('number');
			expect(scrubCPU.codename_input, 'codename_input').to.be.a('string');
			expect(scrubCPU.class_input, 'class_input').to.be.a('string');
			expect(scrubCPU.external_input, 'external_input').to.be.a('string');
			expect(scrubCPU.arch_input, 'arch_input').to.be.a('string');
			expect(scrubCPU.notes_input, 'notes_input').to.be.a('string');

			done();
		});
		it('should have two items in the serial_input array', function(done) {
			expect(scrubCPU.serial_input).to.have.length(2);

			done();
		});
		it('should all contain the right lengths', function(done) {
			expect(scrubCPU.serial_input[0]).to.have.length(14);
			expect(scrubCPU.serial_input[1]).to.have.length(14);
			expect(scrubCPU.spec_input).to.have.length(5);
			expect(scrubCPU.mm_input).to.have.length(6);
			expect(scrubCPU.freq_input).to.have.length(1);
			expect(scrubCPU.step_input).to.have.length(2);
			expect(scrubCPU.codename_input).to.have.length(12);
			expect(scrubCPU.class_input).to.have.length(6);
			expect(scrubCPU.arch_input).to.have.length(7);

			done();
		});
		it('should have the right numbers', function(done) {
			expect(scrubCPU.llc_input).to.equal(3);
			expect(scrubCPU.cores_input).to.equal(7);

			done();
		});
		it('should contain correct values', function(done) {
			expect(scrubCPU.serial_input[0], 'serial_input[0]').to.equal('12345678901234');
			expect(scrubCPU.serial_input[1], 'serial_input[1]').to.equal('ABCDEFGHIJKLMN');
			expect(scrubCPU.spec_input, 'spec_input').to.equal('AX20V');
			expect(scrubCPU.freq_input, 'freq_input').to.equal('2');
			expect(scrubCPU.step_input, 'step_input').to.equal('A4');
			expect(scrubCPU.codename_input, 'codename_input').to.equal('Sandy Bridge');
			expect(scrubCPU.class_input, 'class_input').to.equal('Mobile');
			expect(scrubCPU.external_input, 'external_input').to.equal('Core i7-2710qe');
			expect(scrubCPU.arch_input, 'arch_input').to.equal('Haswell');
			expect(scrubCPU.notes_input, 'notes_input').to.equal('these   -> @!!!! are some notes!!!');

			done();
		});
	});
	describe('#SSD()', function() {
		var scrubSSD;
		before(function() {
			var ssd = {
				serial_input: '1234567890123456\nabcdefghijklmnop  ',
				manufacturer_input: '  lexar and intel    why not    ',
				model_input: '  sr508v    ',
				capacity_input: '  38   ',
				notes_input: '   here a  have      some notes!!!     '
			};

			scrubSSD = scrub.SSD(ssd);
		});
		it('should have correct types', function(done) {

			expect(scrubSSD, 'the whole thing').to.be.an('object');
			expect(scrubSSD.serial_input, 'serial_input').to.be.an('array');
			expect(scrubSSD.manufacturer_input, 'manufacturer_input').to.be.a('string');
			expect(scrubSSD.model_input, 'model_input').to.be.a('string');
			expect(scrubSSD.capacity_input, 'capacity_input').to.be.a('number');
			expect(scrubSSD.notes_input, 'notes_input').to.be.a('string');

			done();
		});
		it('should have two items in the serial_input array', function(done) {
			expect(scrubSSD.serial_input).to.have.length(2);

			done();
		});
		it('should all contain the right lengths', function(done) {
			expect(scrubSSD.serial_input[0]).to.have.length(16);
			expect(scrubSSD.serial_input[1]).to.have.length(16);
			expect(scrubSSD.manufacturer_input).to.have.length(23);
			expect(scrubSSD.model_input).to.have.length(6);
			expect(scrubSSD.notes_input).to.have.length(31);

			done();
		});
		it('should have the right numbers', function(done) {
			expect(scrubSSD.capacity_input).to.equal(38);

			done();
		});
		it('should contain correct values', function(done) {
			expect(scrubSSD.serial_input[0], 'serial_input[0]').to.equal('1234567890123456');
			expect(scrubSSD.serial_input[1], 'serial_input[1]').to.equal('ABCDEFGHIJKLMNOP');
			expect(scrubSSD.notes_input, 'notes_input').to.equal('here a  have      some notes!!!');

			done();
		});
	});

	describe('#Memory()', function() {
		var scrubMemory;
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

			scrubMemory = scrub.Memory(memory);
		});
		it('should have correct types', function(done) {

			expect(scrubMemory, 'the whole thing').to.be.an('object');
			expect(scrubMemory.serial_input, 'serial_input').to.be.an('array');
			expect(scrubMemory.manufacturer_input, 'manufacturer_input').to.be.a('string');
			expect(scrubMemory.physical_size_input, 'physical_size_input').to.be.a('number');
			expect(scrubMemory.ecc_input, 'ecc_input').to.be.a('string');
			expect(scrubMemory.ranks_input, 'ranks_input').to.be.a('number');
			expect(scrubMemory.memory_type_input, 'memory_type_input').to.be.a('string');
			expect(scrubMemory.capacity_input, 'capacity_input').to.be.a('number');
			expect(scrubMemory.notes_input, 'notes_input').to.be.a('string');

			done();
		});
		it('should have two items in the serial_input array', function(done) {
			expect(scrubMemory.serial_input).to.have.length(2);

			done();
		});
		it('should all contain the right lengths', function(done) {
			expect(scrubMemory.serial_input[0]).to.have.length(20);
			expect(scrubMemory.serial_input[1]).to.have.length(20);
			expect(scrubMemory.manufacturer_input).to.have.length(23);
			expect(scrubMemory.ecc_input).to.have.length(3);
			expect(scrubMemory.memory_type_input).to.have.length(4);
			expect(scrubMemory.notes_input).to.have.length(31);

			done();
		});
		it('should have the right numbers', function(done) {
			expect(scrubMemory.physical_size_input).to.equal(123);
			expect(scrubMemory.ranks_input).to.equal(3);
			expect(scrubMemory.capacity_input).to.equal(38);
			expect(scrubMemory.speed_input).to.equal(2048);

			done();
		});
		it('should contain correct values', function(done) {
			expect(scrubMemory.serial_input[0], 'serial_input[0]').to.equal('12345678901234567890');
			expect(scrubMemory.serial_input[1], 'serial_input[1]').to.equal('ABCDEFGHIJKLMNOPQRST');
			expect(scrubMemory.manufacturer_input, 'manufacturer_input').to.equal('Lexar And Intel Why Not');
			expect(scrubMemory.ecc_input, 'ecc_input').to.equal('Yes');
			expect(scrubMemory.memory_type_input, 'memory_type_input').to.equal('DDR4');
			expect(scrubMemory.notes_input, 'notes_input').to.equal('here a  have      some notes!!!');

			done();
		});
	});
});