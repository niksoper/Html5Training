var crypto = require('crypto');

module.exports = {
	Hash256: function(hexString) {

		// convert the hex string to binary before hashing
		var buffer = new Buffer(hexString, 'hex');

		return crypto
			.createHash('sha256')
			.update(buffer)
			.digest('hex');
	}
};