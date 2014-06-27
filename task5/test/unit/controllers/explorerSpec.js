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
						n_tx: 6789
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
				expect(block.n_tx).toBe(6789);
			});

			it('Sets nextBlockHash if http request is successful', function() {

				// set up the data to be returned from the http request
				$httpBackend.when('GET', '/blockexplorer/rawblock/hash')
					.respond({prev_block: 'oldblock'});

				// call the function that is being tested
				ctrl.addBlock('hash', 1);
			
				$httpBackend.flush();
				expect(ctrl.nextBlockHash).toBe('oldblock');
			});

			it('Calls addBlock recursively with number decremented if http request is successful', function() {

				$httpBackend.when('GET', '/blockexplorer/rawblock/hash')
					.respond({prev_block: 'somehash'});

				spyOn(ctrl, 'addBlock').and.callThrough();

				// set up the next http request for the following recursive call
				$httpBackend.when('GET', '/blockexplorer/rawblock/somehash')
					.respond({prev_block: 'anotherhash'});

				ctrl.addBlock('hash', 2);
			
				$httpBackend.flush();
				expect(ctrl.addBlock).toHaveBeenCalledWith('somehash', 1);
				
			});

		});
	});

});