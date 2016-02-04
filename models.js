module.exports = {
	Item: function(type, serial_num, checked_in, notes, scrapped) {
		var self = this;
		self.type = type;
		self.serial_num = serial_num;
		self.checked_in = checked_in;
		self.notes = notes;
		self.scrapped = scrapped;
	}
}