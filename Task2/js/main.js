var blocks = require('./blocks');
var check = require('./blockcheck');

Object.keys(blocks).forEach(function(key) {
	console.log('--' + key + '------------------');
	check.GetBlockHash(blocks[key]);
	check.GetMerkleRoot(blocks[key]);
});