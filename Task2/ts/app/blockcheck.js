var transform = require('./transform');
var hasher = require('./hasher');

var BlockCheck = (function () {
    function BlockCheck() {
    }
    BlockCheck.GetBlockHash = function (block) {
        var header = transform.LittleEndian(block.ver) + transform.SwapBytes(block.prev_block) + transform.SwapBytes(block.mrkl_root) + transform.LittleEndian(block.time) + transform.LittleEndian(block.bits) + transform.LittleEndian(block.nonce);

        var hash = hasher.Hash256(hasher.Hash256(header));
        var hashReversed = transform.SwapBytes(hash);

        console.log('Computed hash\t\t\t' + hashReversed);
        console.log('Presented hash\t\t\t' + block.hash + (hashReversed !== block.hash ? '\tWRONG!!!' : ''));

        return hashReversed;
    };

    BlockCheck.GetMerkleRoot = function (block) {
        var txHashes = module.exports.GetTxHashes(block);
        var computedRoot = module.exports.GetMerkleRootFromArray(txHashes);

        console.log('Computed mrkl_root\t\t' + computedRoot);
        console.log('Presented mrkl_root\t\t' + block.mrkl_root + (computedRoot !== block.mrkl_root ? '\tWRONG!!!' : ''));

        return computedRoot;
    };

    BlockCheck.GetTxHashes = function (block) {
        var tx = [];
        for (var i = 0; i < block.tx.length; i++) {
            tx.push(block.tx[i].hash);
        }

        return tx;
    };

    BlockCheck.GetMerkleRootFromArray = function (tx) {
        if (tx.length == 1) {
            return tx[0];
        }

        if (tx.length % 2 !== 0) {
            tx.push(tx[tx.length - 1]);
        }

        var hashedPairs = [];
        for (var i = 0; i < tx.length - 1; i += 2) {
            var swappedPair = transform.SwapBytes(tx[i]) + transform.SwapBytes(tx[i + 1]);

            var hashedPair = hasher.Hash256(hasher.Hash256(swappedPair));

            hashedPairs.push(transform.SwapBytes(hashedPair));
        }

        return BlockCheck.GetMerkleRootFromArray(hashedPairs);
    };
    return BlockCheck;
})();


module.exports = BlockCheck;

