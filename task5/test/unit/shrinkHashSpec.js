define(['angular-mocks', 'bitCoinApp', 'services'], function(angularMocks, app, sut) {

	describe('Shrink', function() {

		beforeEach(module('bitCoinApp'));

		it('Returns null when passed null', inject(function(shrinkHashService) {

	    	var result = shrinkHashService.Shrink(null);

	        expect(result).toBeNull();

	    }));

	    it('Returns null when passed empty', inject(function(shrinkHashService) {

	    	var result = shrinkHashService.Shrink('');

	        expect(result).toBeNull();

	    }));

	    it('Returns null when passed undefined', inject(function(shrinkHashService) {

	    	var result = shrinkHashService.Shrink(undefined);

	        expect(result).toBeNull();

	    }));

	    it('Returns original if length <= 14', inject(function(shrinkHashService) {

	    	for (var i = 0; i < 14; i++) {

	    		// set the hash input to be a number of 'x' characters for each expectation
				var hash = 'x';
				for (var j = 1; j <= i; j++) {
					hash += 'x';
				} 

				var result = shrinkHashService.Shrink(hash);
		        expect(result).toEqual(hash);

	    	}

	    }));

	    it('Shrinks hash if length = 15', inject(function(shrinkHashService) {

	    	var hash = '1a238e9abf01243';
	    	expect(hash.length).toEqual(15);

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toBe('1a...43');

	    }));

	    it('Compresses leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000000000000006535131384438573747383548438473987312135786';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x16...65...86');

	    }));

	    it('Compresses hash which is all zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000000000000000000000000000000000000000000000000000000000';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x59');

	    }));

	    it('Compresses hash length 15 with 14 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000000000000a';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x14...a');

	    }));

	    it('Compresses hash length 16 with 14 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000000000000a1';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x14...a1');

	    }));

		it('Compresses hash length 17 with 14 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000000000000a15';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x14...a15');

	    }));

		it('Compresses hash length 18 with 14 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000000000000a15f';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x14...a15f');

	    }));

		it('Compresses hash length 19 with 14 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000000000000a15f2';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x14...a15f2');

	    }));

		it('Compresses hash length 20 with 14 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000000000000a15f26';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x14...a15f26');

	    }));

		it('Compresses hash length 21 with 14 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000000000000a15f26b';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x14...a1...6b');

	    }));

	    it('Compresses 5 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '00000a945240abedaffa535131384438573747383548438473987312135a0e';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0x5...a9...0e');

	    }));

	    it('Doesn\'t compress 4 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '0000bcefadec1ad06535131384438573747383548438473987312135786';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0000bc...86');

	    }));

	    it('Doesn\'t compress 3 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '0005bcefadec1ad06535131384438573747383548438473987312135786';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0005b...86');

	    }));

	    it('Doesn\'t compress 2 leading zeroes', inject(function(shrinkHashService) {

	    	var hash = '0095bcefadec1ad06535131384438573747383548438473987312135786';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0095...86');

	    }));

	    it('Doesn\'t compress 1 leading zero', inject(function(shrinkHashService) {

	    	var hash = '0f95bcefadec1ad06535131384438573747383548438473987312135786';

	    	var result = shrinkHashService.Shrink(hash);

	    	expect(result).toEqual('0f9...86');

	    }));

	});
});