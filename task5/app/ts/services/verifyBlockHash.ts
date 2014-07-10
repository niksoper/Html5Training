import bc = require('bitcoin');

export class VerifyHash {

    $http: ng.IHttpService;
    $q: ng.IQService;

    constructor(
        $http: ng.IHttpService,
        $q: ng.IQService) {

        this.$http = $http;
        this.$q = $q;

    }

    public Verify = (block: bc.IBlock): ng.IPromise<boolean> => {

        if (block == null) {

            var deferred = this.$q.defer();
            deferred.resolve(false);

            return deferred.promise;

        } else {

            return this.$http.post('http://localhost:8999/verifyblock', block);

        }
    }
}