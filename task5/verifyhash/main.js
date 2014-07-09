var blocks = require('./blocks');
var check = require('./blockcheck');

Object.keys(blocks).forEach(function(key) {

    var block = blocks[key];
    var computedHash = check.GetBlockHash(block);
    var passFail = computedHash === block.hash
        ? 'CORRECT :-)'
        : 'WRONG! :-(';
            

    console.log('--' + key + '------------------');
    console.log('Computed hash:\t' + computedHash + '\t' + passFail);
    

});