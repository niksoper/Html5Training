var assert = require('assert');

module.exports.LittleEndian = function (number) {
		
	// convert the number to hex
	var hexNumber = number.toString(16);

	// only handle 32 bit values
	assert(hexNumber.length <= 8);

	// pad the hex string to 8 characters
	var padding = '00000000';
	var padAmount = padding.length - hexNumber.length;
	var padded = padding.slice(0, padAmount) + hexNumber;

	var swapped = module.exports.SwapBytes(padded);

	return swapped;
};

module.exports.SwapBytes = function (hex) {

	// check for an even number of characters
	assert(hex.length % 2 === 0);

	// reverse the hex string in pairs of characters (bytes)
	var swapped = '';
	var bytes = hex.length / 2;
	for (var i = 0; i < bytes; i++) {
		swapped = hex.slice(2*i, 2*i+2).concat(swapped);
	}

	return swapped;
}
