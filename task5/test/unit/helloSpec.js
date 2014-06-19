define(['angular-mocks', 'bitCoinApp', 'services/hello'], function(angularMocks, app, hi) {

	describe('hello test', function() {
	    describe('when I call Say', function() {

	        beforeEach(module('bitCoinApp'));

	        it('returns Hello', inject(function(helloService) { //parameter name = service name

	        	var result = helloService.Say();

	            expect( result ).toEqual('Hello');

	        }));

	    });

	});
});