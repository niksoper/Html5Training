define(['controllers/explorer', 'angular-mocks', 'bitCoinApp'], function(controller) {

	describe('ExplorerController', function () {

		var scope, ctrl, $httpBackend, shrinkHashService, $http;

		beforeEach(module('bitCoinApp'));

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, _$http_, _shrinkHashService_) {

			$httpBackend = _$httpBackend_;

			scope = $rootScope.$new();
			ctrl = $controller(controller.ExplorerController, {$scope: scope});
			$http = _$http_;
			shrinkHashService = _shrinkHashService_;

		}));

		describe('Constructor', function() {

			it('$scope.vm is controller', function () {

				expect(scope.vm).toBe(ctrl);

			});

			it('Sets newBlocks to 10', function () {

				expect(ctrl.newBlocks).toBe(10);

			});

			it('Sets shrinkHash function from shrinkHashService', function () {

				expect(ctrl.shrinkHash).toBe(shrinkHashService.Shrink);

			});

			it('Sets blocks to empty array', function () {

				expect(ctrl.blocks).toEqual([]);

			});

			it('Sets injected $http', function () {

				expect(ctrl.$http).toBe($http);

			});

			it('Sets hashError', function () {

				expect(ctrl.hashError).toBe('Latest hash could not be found.');

			});

		});

		describe('filterBySearch', function() {

			it('True if searchText null', function() {

				ctrl.searchText = null;

				var result = ctrl.filterBySearch({});

				expect(result).toBe(true);

			});

			it('True if searchText whitespace', function() {

				ctrl.searchText = ' \t\n\r ';

				var result = ctrl.filterBySearch({});

				expect(result).toBe(true);

			});

			it('True if searchText empty', function() {

				ctrl.searchText = '';

				var result = ctrl.filterBySearch({});

				expect(result).toBe(true);

			});

			it('True if searchText undefined', function() {

				ctrl.searchText = undefined;

				var result = ctrl.filterBySearch({});

				expect(result).toBe(true);

			});

			it('True if item hash contains searchText', function() {

				ctrl.searchText = 'apple';

				var result = ctrl.filterBySearch({hash: 'an apple a day'});

				expect(result).toBe(true);

			});

			it('True if item hash contains searchText ignoring case', function() {

				ctrl.searchText = 'aPpLe';

				var result = ctrl.filterBySearch({hash: 'an apple a day'});

				expect(result).toBe(true);

			});

			it('False if item hash doesn\'t contain searchText', function() {

				ctrl.searchText = 'aPpLe';

				var result = ctrl.filterBySearch({hash: 'an app pool a day'});

				expect(result).toBe(false);

			});

			it('True if item index matches searchText pattern: #{index}', function() {

				ctrl.searchText = '#5';

				var result = ctrl.filterBySearch({index: 5});

				expect(result).toBe(true);

			});

			it('False if item index doesn\'t match searchText pattern: #{index}', function() {

				ctrl.searchText = '#5';

				var result = ctrl.filterBySearch({index: 55});

				expect(result).toBe(false);

			});

			it('True if item hash contains searchText pattern: #{index}', function() {

				ctrl.searchText = '#5';

				var result = ctrl.filterBySearch({index: 6, hash: 'abc_#5_123'});

				expect(result).toBe(true);

			});

		});

		describe('addBlock', function() {

			it('Doesn\'t make http request if hash is undefined', function() {

				spyOn(ctrl.$http, 'get');

				ctrl.addBlock(undefined, 1);

				expect(ctrl.$http.get).not.toHaveBeenCalled();

			});

			it('Doesn\'t make http request if remaining is 0', function() {

				spyOn(ctrl.$http, 'get');

				ctrl.addBlock('hash', 0);

				expect(ctrl.$http.get).not.toHaveBeenCalled();

			});

			it('Doesn\'t make http request if remaining is -1', function() {

				spyOn(ctrl.$http, 'get');

				ctrl.addBlock('hash', -1);

				expect(ctrl.$http.get).not.toHaveBeenCalled();

			});

			it('Adds to blocks if http request is successful', function() {

				// set up the data to be returned from the http request
				$httpBackend.when('GET', '/blockexplorer/rawblock/hash')
					.respond({
						hash: 'fakehash',
						time: 12345,
						n_tx: 6789,
						tx: [{ out: [{ value: 5 }] },
						     { out: [{ value: 10 }] }]
					});

				// before calling addBlock there should be no blocks
				expect(ctrl.blocks.length).toBe(0);

				// call the function that is being tested
				ctrl.addBlock('hash', 1);

				// until the success callback is called, there should still be no blocks
				expect(ctrl.blocks.length).toBe(0);

				// after success callback (triggered by flush()) there should be a block				
				$httpBackend.flush();
				expect(ctrl.blocks.length).toBe(1);

				// assert the block properties are as expected
				var block = ctrl.blocks[0];
				expect(block.index).toBe(1);
				expect(block.hash).toBe('fakehash');
				expect(block.time).toBe(12345);
				expect(block.txValues).toEqual([5, 10]);
			});

			it('Sets nextBlockHash if http request is successful', function() {

				// set up the data to be returned from the http request
				$httpBackend.when('GET', '/blockexplorer/rawblock/hash')
					.respond({
					    prev_block: 'oldblock',
					    tx: [{ out: [{ value: 5 }] },
						     { out: [{ value: 10 }] }]
					});

				// call the function that is being tested
				ctrl.addBlock('hash', 1);
			
				$httpBackend.flush();
				expect(ctrl.nextBlockHash).toBe('oldblock');
			});

			it('Calls addBlock recursively with number decremented if http request is successful', function() {

				$httpBackend.when('GET', '/blockexplorer/rawblock/hash')
					.respond({
					    prev_block: 'somehash',
					    tx: [{ out: [{ value: 5 }] },
						     { out: [{ value: 10 }] }]
					});

				spyOn(ctrl, 'addBlock').and.callThrough();

				// set up the next http request for the following recursive call
				$httpBackend.when('GET', '/blockexplorer/rawblock/somehash')
					.respond({
					    prev_block: 'anotherhash',
					    tx: [{ out: [{ value: 5 }] },
						     { out: [{ value: 10 }] }]
					});

				ctrl.addBlock('hash', 2);
			
				$httpBackend.flush();
				expect(ctrl.addBlock).toHaveBeenCalledWith('somehash', 1);
				
			});

			it('Calls addBlock with hash from one block below latest if http request fails', function() {

				// set up the http request to fail with a 404 error
				$httpBackend.when('GET', '/blockexplorer/rawblock/hash').respond(404, {});

				// the controller should fall back onto the block below the lastest hash
				$httpBackend.when('GET', '/blockexplorer/q/getblockcount')
					.respond('100');
				$httpBackend.when('GET', '/blockexplorer/q/getblockhash/99')
					.respond('thisIsTheHashYouAreLookingFor');

				// ensure that the fallback request succeeds
				$httpBackend.when('GET', '/blockexplorer/rawblock/thisIsTheHashYouAreLookingFor')
				.respond({
    		        tx: [{ out: [{ value: 5 }] },
					     { out: [{ value: 10 }] }]
				});

				spyOn(ctrl, 'addBlock').and.callThrough();

				ctrl.addBlock('hash', 1);
				$httpBackend.flush();

				expect(ctrl.addBlock).toHaveBeenCalledWith('thisIsTheHashYouAreLookingFor', 1);

			});

			it('Calls setHashError if http request fails and fallback request to getblockcount fails', function () {

			    // set up the http request to fail with a 404 error
			    $httpBackend.expectGET('/blockexplorer/rawblock/hash').respond(404, {});

			    // the controller should fall back onto the block below the lastest hash but set that to fail too
			    $httpBackend.expectGET('/blockexplorer/q/getblockcount').respond(500, {});

			    spyOn(ctrl, 'setHashError').and.callThrough();

			    ctrl.addBlock('hash', 1);
			    $httpBackend.flush();

			    expect(ctrl.setHashError).toHaveBeenCalled();

			});

			it('Calls setHashError if http request fails and fallback request to hash for next block down fails', function () {

			    // set up the http request to fail with a 404 error
			    $httpBackend.expectGET('/blockexplorer/rawblock/hash').respond(404, {});

			    // set the block height to 123
			    $httpBackend.expectGET('/blockexplorer/q/getblockcount').respond('123');

			    // set up the request for the hash for block 122 to fail
			    $httpBackend.expectGET('/blockexplorer/q/getblockhash/122').respond(500, {});

			    spyOn(ctrl, 'setHashError').and.callThrough();

			    ctrl.addBlock('hash', 1);
			    $httpBackend.flush();

			    expect(ctrl.setHashError).toHaveBeenCalled();

			});

		});

		describe('addLatestBlock', function() {

			it('Calls addBlock with latest hash from http request', function() {

				$httpBackend.when('GET', '/blockexplorer/q/latesthash')
					.respond('thelatesthash');

				spyOn(ctrl, 'addBlock');

				ctrl.newBlocks = 345;

				ctrl.addLatestBlock();
				$httpBackend.flush();

				expect(ctrl.addBlock).toHaveBeenCalledWith('thelatesthash', 345);

			});

			it('Calls setHashError if http request not successful', function() {

				$httpBackend.when('GET', '/blockexplorer/q/latesthash')
					.respond(500, {});

				spyOn(ctrl, 'setHashError');

				ctrl.addLatestBlock();
				$httpBackend.flush();

				expect(ctrl.setHashError).toHaveBeenCalled();

			});

			it('Doesn\'t call addBlock if http request not successful', function() {

				$httpBackend.when('GET', '/blockexplorer/q/latesthash')
					.respond(500, {});

				spyOn(ctrl, 'addBlock');

				ctrl.addLatestBlock();
				$httpBackend.flush();

				expect(ctrl.addBlock).not.toHaveBeenCalled();

			});

		});

		describe('setHashError', function() {

			it('Sets errorMsg to hashError', function() {

				ctrl.hashError = 'some message';

				ctrl.setHashError();

				expect(ctrl.errorMsg).toBe(ctrl.hashError);

			});

		});

	});

});