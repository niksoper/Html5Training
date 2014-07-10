define(['angular-mocks', 'bitCoinApp', 'services'], function () {

    describe('VerifyHash', function () {

        var $httpBackend, verifyBlockHashService, $http;

        beforeEach(module('bitCoinApp'));

        beforeEach(inject(function (_$httpBackend_, _verifyBlockHashService_, _$http_, $q) {

            $httpBackend = _$httpBackend_;
            verifyBlockHashService = _verifyBlockHashService_;
            verifyBlockHashService.$http = $http = _$http_;
            verifyBlockHashService.$q = $q;

        }));

        it('Returns false when passed null', function () {

            verifyBlockHashService.Verify(null).then(function (result) {

                expect(result).toBe(false);

            });

        });

        it('Returns false when passed undefined', function () {

            verifyBlockHashService.Verify(undefined).then(function (result) {

                expect(result).toBe(false);

            });

        });

        it('Returns true if http request returns true', function () {

            var block = {};

            $httpBackend.expectPOST('http://localhost:8999/verifyblock')
                .respond(200, true);

            verifyBlockHashService.Verify(block).then(function (result) {

                expect(result).toBe(true);

            });

        });

        it('Returns false if http request returns false', function () {

            var block = {};

            $httpBackend.expectPOST('http://localhost:8999/verifyblock')
                .respond(200, false);

            verifyBlockHashService.Verify(block).then(function (result) {

                expect(result).toBe(false);

            });

        });

    });
});