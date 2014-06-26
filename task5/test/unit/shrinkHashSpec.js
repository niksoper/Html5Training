define(['angular-mocks', 'bitCoinApp', 'services'], function(angularMocks, app, sut) {

	describe('When I call Shrink', function() {

		beforeEach(module('bitCoinApp'));

		it('with null', inject(function(shrinkHashService) {

	    	var result = shrinkHashService.Shrink(null);

	        expect(result).toBeNull();

	    }));

	});
});