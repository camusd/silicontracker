var assert = require('assert');
var scrub = require('../app/scrubbers');
var chai = require('chai');
var expect = chai.expect;

describe('scrub', function() {
	describe('#CPU()', function() {
		var scrubCPU;
		before(function() {
			var cpu = {
				serial_num: '12345678901234\nabcdefghijklmn  ',
				spec: '   ax20v  ',
				mm: '  929620   ',
				frequency: '  2.00   ',
				stepping: '  a4 ',
				llc: '  3 ',
				cores: '  7   ',
				codename: '   sandy   bridge    ',
				cpu_class: ' mobile   ',
				external_name: '  core   i7-2710qe    ',
				architecture: '  haswell   ',
				notes: '   these   -> @!!!! are some notes!!!    '
			};

			scrubCPU = scrub.CPU(cpu);
		});
		it('should have correct types', function(done) {

			expect(scrubCPU, 'the whole thing').to.be.an('object');
			expect(scrubCPU.serial_num, 'serial_num').to.be.an('array');
			expect(scrubCPU.spec, 'spec').to.be.a('string');
			expect(scrubCPU.mm, 'mm').to.be.a('string');
			expect(scrubCPU.frequency, 'frequency').to.be.a('string');
			expect(scrubCPU.stepping, 'stepping').to.be.a('string');
			expect(scrubCPU.llc, 'llc').to.be.a('number');
			expect(scrubCPU.cores, 'cores').to.be.a('number');
			expect(scrubCPU.codename, 'codename').to.be.a('string');
			expect(scrubCPU.cpu_class, 'cpu_class').to.be.a('string');
			expect(scrubCPU.external_name, 'external_name').to.be.a('string');
			expect(scrubCPU.architecture, 'architecture').to.be.a('string');
			expect(scrubCPU.notes, 'notes').to.be.a('string');

			done();
		});
		it('should have two items in the serial_num array', function(done) {
			expect(scrubCPU.serial_num).to.have.length(2);

			done();
		});
		it('should all contain the right lengths', function(done) {
			expect(scrubCPU.serial_num[0]).to.have.length(14);
			expect(scrubCPU.serial_num[1]).to.have.length(14);
			expect(scrubCPU.spec).to.have.length(5);
			expect(scrubCPU.mm).to.have.length(6);
			expect(scrubCPU.frequency).to.have.length(1);
			expect(scrubCPU.stepping).to.have.length(2);
			expect(scrubCPU.codename).to.have.length(12);
			expect(scrubCPU.cpu_class).to.have.length(6);
			expect(scrubCPU.architecture).to.have.length(7);

			done();
		});
		it('should have the right numbers', function(done) {
			expect(scrubCPU.llc).to.equal(3);
			expect(scrubCPU.cores).to.equal(7);

			done();
		});
		it('should contain correct values', function(done) {
			expect(scrubCPU.serial_num[0], 'serial_num[0]').to.equal('12345678901234');
			expect(scrubCPU.serial_num[1], 'serial_num[1]').to.equal('ABCDEFGHIJKLMN');
			expect(scrubCPU.spec, 'spec').to.equal('AX20V');
			expect(scrubCPU.frequency, 'frequency').to.equal('2');
			expect(scrubCPU.stepping, 'stepping').to.equal('A4');
			expect(scrubCPU.codename, 'codename').to.equal('Sandy Bridge');
			expect(scrubCPU.cpu_class, 'cpu_class').to.equal('Mobile');
			expect(scrubCPU.external_name, 'external_name').to.equal('Core i7-2710qe');
			expect(scrubCPU.architecture, 'architecture').to.equal('Haswell');
			expect(scrubCPU.notes, 'notes').to.equal('these   -> @!!!! are some notes!!!');

			done();
		});
	});
	describe('#SSD()', function() {
		var scrubSSD;
		before(function() {
			var ssd = {
				serial_num: '1234567890123456\nabcdefghijklmnop  ',
				manufacturer: '  lexar and intel    why not    ',
				model: '  sr508v    ',
				capacity: '  38   ',
				notes: '   here a  have      some notes!!!     '
			};

			scrubSSD = scrub.SSD(ssd);
		});
		it('should have correct types', function(done) {

			expect(scrubSSD, 'the whole thing').to.be.an('object');
			expect(scrubSSD.serial_num, 'serial_num').to.be.an('array');
			expect(scrubSSD.manufacturer, 'manufacturer').to.be.a('string');
			expect(scrubSSD.model, 'model').to.be.a('string');
			expect(scrubSSD.capacity, 'capacity').to.be.a('number');
			expect(scrubSSD.notes, 'notes').to.be.a('string');

			done();
		});
		it('should have two items in the serial_num array', function(done) {
			expect(scrubSSD.serial_num).to.have.length(2);

			done();
		});
		it('should all contain the right lengths', function(done) {
			expect(scrubSSD.serial_num[0]).to.have.length(16);
			expect(scrubSSD.serial_num[1]).to.have.length(16);
			expect(scrubSSD.manufacturer).to.have.length(23);
			expect(scrubSSD.model).to.have.length(6);
			expect(scrubSSD.notes).to.have.length(31);

			done();
		});
		it('should have the right numbers', function(done) {
			expect(scrubSSD.capacity).to.equal(38);

			done();
		});
		it('should contain correct values', function(done) {
			expect(scrubSSD.serial_num[0], 'serial_num[0]').to.equal('1234567890123456');
			expect(scrubSSD.serial_num[1], 'serial_num[1]').to.equal('ABCDEFGHIJKLMNOP');
			expect(scrubSSD.notes, 'notes').to.equal('here a  have      some notes!!!');

			done();
		});
	});

	describe('#Memory()', function() {
		var scrubMemory;
		before(function() {
			var memory = {
				serial_num: '12345678901234567890\nabcdefghijklmnopqrst  ',
				manufacturer: '  lexar and intel    why not    ',
				physical_size: '  123   ',
				ecc: '   yes',
				ranks: '  3   ',
				memory_type: '  dDr4    ',
				capacity: '  38   ',
				speed: '  2048   ',
				notes: '   here a  have      some notes!!!     '
			};

			scrubMemory = scrub.Memory(memory);
		});
		it('should have correct types', function(done) {

			expect(scrubMemory, 'the whole thing').to.be.an('object');
			expect(scrubMemory.serial_num, 'serial_num').to.be.an('array');
			expect(scrubMemory.manufacturer, 'manufacturer').to.be.a('string');
			expect(scrubMemory.physical_size, 'physical_size').to.be.a('number');
			expect(scrubMemory.ecc, 'ecc').to.be.a('string');
			expect(scrubMemory.ranks, 'ranks').to.be.a('number');
			expect(scrubMemory.memory_type, 'memory_type').to.be.a('string');
			expect(scrubMemory.capacity, 'capacity').to.be.a('number');
			expect(scrubMemory.notes, 'notes').to.be.a('string');

			done();
		});
		it('should have two items in the serial_num array', function(done) {
			expect(scrubMemory.serial_num).to.have.length(2);

			done();
		});
		it('should all contain the right lengths', function(done) {
			expect(scrubMemory.serial_num[0]).to.have.length(20);
			expect(scrubMemory.serial_num[1]).to.have.length(20);
			expect(scrubMemory.manufacturer).to.have.length(23);
			expect(scrubMemory.ecc).to.have.length(3);
			expect(scrubMemory.memory_type).to.have.length(4);
			expect(scrubMemory.notes).to.have.length(31);

			done();
		});
		it('should have the right numbers', function(done) {
			expect(scrubMemory.physical_size).to.equal(123);
			expect(scrubMemory.ranks).to.equal(3);
			expect(scrubMemory.capacity).to.equal(38);
			expect(scrubMemory.speed).to.equal(2048);

			done();
		});
		it('should contain correct values', function(done) {
			expect(scrubMemory.serial_num[0], 'serial_num[0]').to.equal('12345678901234567890');
			expect(scrubMemory.serial_num[1], 'serial_num[1]').to.equal('ABCDEFGHIJKLMNOPQRST');
			expect(scrubMemory.manufacturer, 'manufacturer').to.equal('Lexar And Intel Why Not');
			expect(scrubMemory.ecc, 'ecc').to.equal('Yes');
			expect(scrubMemory.memory_type, 'memory_type').to.equal('DDR4');
			expect(scrubMemory.notes, 'notes').to.equal('here a  have      some notes!!!');

			done();
		});
	});

	describe('#Flash Drives()', function() {
		var scrubFlash;
		before(function() {
			var flash = {
				serial_num: '1234567890123456\nabcdefghijklmnop  ',
				manufacturer: '  lexar and intel    why not    ',
				capacity: '  38   ',
				notes: '   here a  have      some notes!!!     '
			};

			scrubFlash = scrub.Flash(flash);
		});
		it('should have correct types', function(done) {

			expect(scrubFlash, 'the whole thing').to.be.an('object');
			expect(scrubFlash.serial_num, 'serial_num').to.be.an('array');
			expect(scrubFlash.manufacturer, 'manufacturer').to.be.a('string');
			expect(scrubFlash.capacity, 'capacity').to.be.a('number');
			expect(scrubFlash.notes, 'notes').to.be.a('string');

			done();
		});
		it('should have two items in the serial_num array', function(done) {
			expect(scrubFlash.serial_num).to.have.length(2);

			done();
		});
		it('should all contain the right lengths', function(done) {
			expect(scrubFlash.serial_num[0]).to.have.length(16);
			expect(scrubFlash.serial_num[1]).to.have.length(16);
			expect(scrubFlash.manufacturer).to.have.length(23);
			expect(scrubFlash.notes).to.have.length(31);

			done();
		});
		it('should have the right numbers', function(done) {
			expect(scrubFlash.capacity).to.equal(38);

			done();
		});
		it('should contain correct values', function(done) {
			expect(scrubFlash.serial_num[0], 'serial_num[0]').to.equal('1234567890123456');
			expect(scrubFlash.serial_num[1], 'serial_num[1]').to.equal('ABCDEFGHIJKLMNOP');
			expect(scrubFlash.notes, 'notes').to.equal('here a  have      some notes!!!');

			done();
		});
	});
});