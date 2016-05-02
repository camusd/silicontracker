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

			scrubbed = scrub.CPU(cpu);
			val = validate.CPU(scrubbed);
		});
		it('should have no errors', function(done) {
			expect(val).to.be.undefined;

			done();
		});
		it('should complain about serial_num number length', function(done) {
			var c = scrubbed;
			c.serial_num = ['12345678901234', 'ABCDEFGHIJKLMNO'];

			var v = validate.CPU(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('ABCDEFGHIJKLMNO');
			expect(v.serial_num[0]).to.contain('length');

			done();
		});
		it('should complain about serial_num number format', function(done) {
			var c = scrubbed;
			c.serial_num = ['@@@@ABCD@@@@AB', 'ABCDEFGHIJKLMN'];

			var v = validate.CPU(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('@@@@ABCD@@@@AB');
			expect(v.serial_num[0]).to.contain('alphanumeric');

			done();
		});
		it('should complain about missing parameters', function(done) {
			var c = {
				serial_num: '',
				spec: '',
				mm: '',
				frequency: '',
				stepping: '',
				llc: '',
				cores: '',
				codename: '',
				cpu_class: '',
				external_name: '',
				architecture: '',
				notes: ''
			};

			var v = validate.CPU(c);
			expect(v.serial_num).to.be.not.undefined;
			expect(v.spec).to.be.not.undefined;
			expect(v.mm).to.be.not.undefined;
			expect(v.frequency).to.be.not.undefined;
			expect(v.stepping).to.be.not.undefined;
			expect(v.llc).to.be.not.undefined;
			expect(v.cores).to.be.not.undefined;
			expect(v.codename).to.be.not.undefined;
			expect(v.cpu_class).to.be.not.undefined;
			expect(v.architecture).to.be.not.undefined;

			done();
		});

		it ('should be fine with no values for optional attributes', function(done) {
			var c = {
				serial_num: '',
				spec: '',
				mm: '',
				frequency: '',
				stepping: '',
				llc: '',
				cores: '',
				codename: '',
				cpu_class: '',
				external_name: '',
				architecture: '',
				notes: ''
			};

			var v = validate.CPU(c);
			expect(v.external_name).to.be.undefined;
			expect(v.notes).to.be.undefined;

			done();
		});
	});
	describe('#SSD()', function() {
		var val;
		var scrubbed;
		before(function() {
			var ssd = {
				serial_num: '1234567890123456\nabcdefghijklmnop  ',
				manufacturer: '  lexar and intel    why not    ',
				model: '  sr508v    ',
				capacity: '  38   ',
				notes: '   here a  have      some notes!!!     '
			};

			scrubbed = scrub.SSD(ssd);
			val = validate.SSD(scrubbed);
		});
		it('should have no errors', function(done) {
			expect(val).to.be.undefined;

			done();
		});
		it('should complain about serial_num number length', function(done) {
			var c = scrubbed;
			c.serial_num = ['1234567890123456', 'ABCDEFGHIJKLMNOPQRS'];

			var v = validate.SSD(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('ABCDEFGHIJKLMNOPQRS');
			expect(v.serial_num[0]).to.contain('length');

			done();
		});
		it('should complain about serial_num number format', function(done) {
			var c = scrubbed;
			c.serial_num = ['@@@@ABCD@@@@AB', 'ABCDEFGHIJKLMN'];

			var v = validate.SSD(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('@@@@ABCD@@@@AB');
			expect(v.serial_num[0]).to.contain('alphanumeric');

			done();
		});
		it('should complain about missing parameters', function(done) {
			var c = {
				serial_num: '',
				manufacturer: '',
				model: '',
				capacity: '',
				notes: ''
			};

			var v = validate.SSD(c);
			expect(v.serial_num).to.be.not.undefined;
			expect(v.manufacturer).to.be.not.undefined;
			expect(v.model).to.be.not.undefined;
			expect(v.capacity).to.be.not.undefined;

			done();
		});

		it ('should be fine with no values for optional attributes', function(done) {
			var c = {
				serial_num: '',
				manufacturer: '',
				model: '',
				capacity: '',
				notes: ''
			};

			var v = validate.SSD(c);
			expect(v.notes).to.be.undefined;

			done();
		});
	});
	describe('#Memory()', function() {
		var val;
		var scrubbed;
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

			scrubbed = scrub.Memory(memory);
			val = validate.Memory(scrubbed);
		});
		it('should have no errors', function(done) {
			expect(val).to.be.undefined;

			done();
		});
		it('should complain about serial_num number length', function(done) {
			var c = scrubbed;
			c.serial_num = ['1234567890123456', 'ABCDEFGHIJKLMNOPQRSTU'];

			var v = validate.Memory(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('ABCDEFGHIJKLMNOPQRSTU');
			expect(v.serial_num[0]).to.contain('length');

			done();
		});
		it('should complain about serial_num number format', function(done) {
			var c = scrubbed;
			c.serial_num = ['@@@@ABCD@@@@AB', 'ABCDEFGHIJKLMN'];

			var v = validate.Memory(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('@@@@ABCD@@@@AB');
			expect(v.serial_num[0]).to.contain('alphanumeric');

			done();
		});
		it('should complain about missing parameters', function(done) {
			var c = {
				serial_num: '',
				manufacturer: '',
				physical_size: '',
				ecc: '',
				ranks: '',
				memory_type: '',
				capacity: '',
				speed: '',
				notes: ''
			};

			var v = validate.Memory(c);
			expect(v.serial_num).to.be.not.undefined;
			expect(v.manufacturer).to.be.not.undefined;
			expect(v.physical_size).to.be.not.undefined;
			expect(v.ecc).to.be.not.undefined;
			expect(v.ranks).to.be.not.undefined;
			expect(v.memory_type).to.be.not.undefined;
			expect(v.capacity).to.be.not.undefined;
			expect(v.speed).to.be.not.undefined;

			done();
		});

		it ('should be fine with no values for optional attributes', function(done) {
			var c = {
				serial_num: '',
				manufacturer: '',
				physical_size: '',
				ecc: '',
				ranks: '',
				memory_type: '',
				capacity: '',
				speed: '',
				notes: ''
			};

			var v = validate.Memory(c);
			expect(v.notes).to.be.undefined;

			done();
		});
	});
	describe('#Flash Drives()', function() {
		var val;
		var scrubbed;
		before(function() {
			var flash = {
				serial_num: '1234567890123456\nabcdefghijklmnop  ',
				manufacturer: '  lexar and intel    why not    ',
				capacity: '  38   ',
				notes: '   here a  have      some notes!!!     '
			};

			scrubbed = scrub.Flash(flash);
			val = validate.Flash(scrubbed);
		});
		it('should have no errors', function(done) {
			expect(val).to.be.undefined;

			done();
		});
		it('should complain about serial_num number length', function(done) {
			var c = scrubbed;
			c.serial_num = ['1234567890123456', 'ABCDEFGHIJKLMNOPQRSTU'];

			var v = validate.Flash(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('ABCDEFGHIJKLMNOPQRSTU');
			expect(v.serial_num[0]).to.contain('length');

			done();
		});
		it('should complain about serial_num number format', function(done) {
			var c = scrubbed;
			c.serial_num = ['@@@@ABCD@@@@AB', 'ABCDEFGHIJKLMN'];

			var v = validate.Flash(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('@@@@ABCD@@@@AB');
			expect(v.serial_num[0]).to.contain('alphanumeric');

			done();
		});
		it('should complain about missing parameters', function(done) {
			var c = {
				serial_num: '',
				manufacturer: '',
				capacity: '',
				notes: ''
			};

			var v = validate.Flash(c);
			expect(v.serial_num).to.be.not.undefined;
			expect(v.manufacturer).to.be.not.undefined;
			expect(v.capacity).to.be.not.undefined;

			done();
		});

		it ('should be fine with no values for optional attributes', function(done) {
			var c = {
				serial_num: '',
				manufacturer: '',
				capacity: '',
				notes: ''
			};

			var v = validate.Flash(c);
			expect(v.notes).to.be.undefined;

			done();
		});
	});
	describe('#Board()', function() {
		var val;
		var scrubbed;
		before(function() {
			var board = {
				serial_num: '1234567890123456\nabcdefghijklmnop  ',
				fpga: '  123 456 789 0 123 456 789 123    ',
				bios: ' 1234567980:1234567980:1234567980:1234567980:1234567980:1234567980:123456789   ',
				mac:  ' 1234567980:123456   ',
				fab:  ' Fab A   ',
				notes: '   here a  have      some notes!!!     '
			};

			scrubbed = scrub.Board(board);
			val = validate.Board(scrubbed);
		});
		it('should have no errors', function(done) {
			expect(val).to.be.undefined;

			done();
		});
		it('should complain about serial_num number length', function(done) {
			var c = scrubbed;
			c.serial_num = ['1234567890123456', 'ABCDEFGHIJKLMNOPQRSTU'];

			var v = validate.Board(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('ABCDEFGHIJKLMNOPQRSTU');
			expect(v.serial_num[0]).to.contain('length');

			done();
		});
		it('should complain about serial_num number format', function(done) {
			var c = scrubbed;
			c.serial_num = ['@@@@ABCD@@@@AB', 'ABCDEFGHIJKLMN'];

			var v = validate.Board(c);

			expect(v.serial_num).to.have.length(1);
			expect(v.serial_num[0]).to.contain('@@@@ABCD@@@@AB');
			expect(v.serial_num[0]).to.contain('alphanumeric');

			done();
		});
		it('should complain about missing parameters', function(done) {
			var c = {
				serial_num: '',
				fpga: '',
				bios: '',
				mac:  '',
				fab:  '',
				notes: ''
			};

			var v = validate.Board(c);
			expect(v.serial_num).to.be.not.undefined;

			done();
		});

		it ('should be fine with no values for optional attributes', function(done) {
			var c = {
				serial_num: '',
				fpga: '',
				bios: '',
				mac:  '',
				fab:  '',
				notes: ''
			};

			var v = validate.Board(c);
			expect(v.fpga).to.be.undefined;
			expect(v.bios).to.be.undefined;
			expect(v.mac).to.be.undefined;
			expect(v.fab).to.be.undefined;
			expect(v.notes).to.be.undefined;

			done();
		});
	});
});