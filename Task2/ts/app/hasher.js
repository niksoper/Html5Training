var crypto = require('crypto');

function Hash256(hexString) {
    var buffer = new Buffer(hexString, 'hex');

    return crypto.createHash('sha256').update(buffer).digest('hex');
}
exports.Hash256 = Hash256;

