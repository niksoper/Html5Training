/// <reference path="./reference.ts" />

import transform = require('./transform');
import hasher = require('./hasher');

class BlockCheck {
	
	public static GetBlockHash = (block: any): string => {

		var header =
			transform.LittleEndian(block.ver) +
			transform.SwapBytes(block.prev_block) +
			transform.SwapBytes(block.mrkl_root) +
			transform.LittleEndian(block.time) +
			transform.LittleEndian(block.bits) +
			transform.LittleEndian(block.nonce);

		var hash = hasher.Hash256(hasher.Hash256(header));
		var hashReversed = transform.SwapBytes(hash);

		console.log('Computed hash\t\t\t' + hashReversed);
		console.log('Presented hash\t\t\t' + block.hash + (hashReversed !== block.hash ? '\tWRONG!!!' : ''));

		return hashReversed;

	}

    public static GetMerkleRoot = (block: any): string => {

		var txHashes = module.exports.GetTxHashes(block);
		var computedRoot = module.exports.GetMerkleRootFromArray(txHashes);

		console.log('Computed mrkl_root\t\t' + computedRoot);
		console.log('Presented mrkl_root\t\t' + block.mrkl_root + (computedRoot !== block.mrkl_root ? '\tWRONG!!!' : ''));

		return computedRoot;
	}

	private static GetTxHashes = (block: any): string[] => {

		var tx = [];
		for (var i = 0; i < block.tx.length; i++) {
			tx.push(block.tx[i].hash);
		}

		return tx;
	}

	private static GetMerkleRootFromArray = (tx: any) : string => {

		if (tx.length == 1) {
			return tx[0];
		}

		// duplicate the last element if there are an odd number of elements
		if (tx.length % 2 !== 0) {
			tx.push(tx[tx.length - 1]);
		}

		var hashedPairs = [];
		for (var i = 0; i < tx.length - 1; i += 2) {

			var swappedPair =
				transform.SwapBytes(tx[i]) + 
				transform.SwapBytes(tx[i+1]);

			var hashedPair = hasher.Hash256(hasher.Hash256(swappedPair));

			hashedPairs.push(transform.SwapBytes(hashedPair));

		}

		return BlockCheck.GetMerkleRootFromArray(hashedPairs);

	}
}

export = BlockCheck;