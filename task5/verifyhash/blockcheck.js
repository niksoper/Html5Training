var transform = require('./transform');
var hasher = require('./hasher');

module.exports.GetBlockHash = function (block) {

	var header =
		transform.LittleEndian(block.ver) +
		transform.SwapBytes(block.prev_block) +
		transform.SwapBytes(block.mrkl_root) +
		transform.LittleEndian(block.time) +
		transform.LittleEndian(block.bits) +
		transform.LittleEndian(block.nonce);

	var hash = hasher.Hash256(hasher.Hash256(header));
	var hashReversed = transform.SwapBytes(hash);

	return hashReversed;

};

module.exports.GetMerkleRoot = function (block) {

	var txHashes = module.exports.GetTxHashes(block);
	var computedRoot = module.exports.GetMerkleRootFromArray(txHashes);

	return computedRoot;
};

module.exports.GetTxHashes = function (block) {
	var tx = [];
	for (i = 0; i < block.tx.length; i++) {
		tx.push(block.tx[i].hash);
	}

	return tx;
};

module.exports.GetMerkleRootFromArray = function GetMrklRoot (tx) {

	if (tx.length == 1) {
		return tx[0];
	}

	// duplicate the last element if there are an odd number of elements
	if (tx.length % 2 !== 0) {
		tx.push(tx[tx.length - 1]);
	}

	var hashedPairs = [];
	for (i = 0; i < tx.length - 1; i += 2) {

		var swappedPair =
			transform.SwapBytes(tx[i]) + 
			transform.SwapBytes(tx[i+1]);

		var hashedPair = hasher.Hash256(hasher.Hash256(swappedPair));

		hashedPairs.push(transform.SwapBytes(hashedPair));

	}

	return GetMrklRoot(hashedPairs);

};