var blocks = require('./blocks');
var check = require('./blockcheck');

for (var block in blocks) {
	
	
	console.log('--' + block + '------------------');
	check.GetBlockHash(blocks[block]);
	check.GetMerkleRoot(blocks[block]);

}