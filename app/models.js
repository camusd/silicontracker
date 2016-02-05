module.exports = {
	Item: function(id, type, serial_num, checked_in, notes, scrapped) {
		var self = this;

		self.id = id || 0;
		self.type = type;
		self.serial_num = serial_num;
		self.checked_in = checked_in;
		self.notes = notes;
		self.scrapped = scrapped;
	},

	CPU: function(spec, mm, frequency, stepping, llc, cores, codename, cpu_class, external_name, architecture, product_id) {
		var self = this;

		self.spec = spec;
		self.mm = mm;
		self.frequency = frequency;
		self.stepping = stepping;
		self.llc = llc;
		self.cores = cores;
		self.codename = codename;
		self.cpu_class = cpu_class;
		self.external_name = external_name;
		self.architecture = architecture;
		self.product_id = product_id;
	},

	CPUVM: function(id, spec, mm, frequency, stepping, llc, cores, codename, cpu_class, external_name, architecture) {
		var self = this;
		
		self.id = id || 0;
		self.spec = spec;
		self.mm = mm;
		self.frequency = frequency;
		self.stepping = stepping;
		self.llc = llc;
		self.cores = cores;
		self.codename = codename;
		self.cpu_class = cpu_class;
		self.external_name = external_name;
		self.architecture = architecture;
	}
}