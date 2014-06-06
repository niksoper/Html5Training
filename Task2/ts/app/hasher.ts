/// <reference path="./reference.ts" />

import crypto = require('crypto');

export function Hash256(hexString) {

	// convert the hex string to binary before hashing
	var buffer = new Buffer(hexString, 'hex');

	return crypto
		.createHash('sha256')
		.update(buffer)
		.digest('hex');
}