import bitCoinApp = require('bitCoinApp');
import shrinker = require('services/shrinkHash');
import verifier = require('services/verifyBlockHash');

bitCoinApp.service('shrinkHashService', [shrinker.ShrinkHash]);
bitCoinApp.service('verifyBlockHashService', ['$http', '$q', function ($http, $q) {

    this.Verify = function Verify (block) {

        if (block == null) {

            var deferred = $q.defer();
            deferred.resolve(false);

            return deferred.promise;

        } else {

            return $http.post('/verifier/verifyblock', block);

        }
    }

}]);
