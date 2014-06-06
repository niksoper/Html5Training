var blocks = require('./blocks');
var check = require('./blockcheck');

for (var i = 0; i < blocks.length; i++) {
    var block = blocks[i];

    console.log('------------------------------------------------------------------------------------------------');
    check.GetBlockHash(block);
    check.GetMerkleRoot(block);
}

