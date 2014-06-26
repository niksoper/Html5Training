define(['controllers/explorer', 'angular-mocks', 'bitCoinApp'], function(controller) {

	describe('ExplorerController', function () {

		var scope, ctrl, $httpBackend, shrinkHashService;

		beforeEach(module('bitCoinApp'));

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, _shrinkHashService_) {

			$httpBackend = _$httpBackend_;
			scope = $rootScope.$new();
			ctrl = $controller(controller.ExplorerController, {$scope: scope});
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

	});

});