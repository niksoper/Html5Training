var BitCoinClient;
(function (BitCoinClient) {
    'use strict';

    require.config({
        paths: {
            'angular': '../bower_components/angular/angular',
            'angular-route': '../bower_components/angular-route/angular-route',
            'angularResource': '../bower_components/angular-resource/angular-resource',
            'jquery': '../bower_components/jquery/jquery',
            'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'angular-route': {
                deps: ['angular']
            },
            'angularResource': {
                deps: ['angular']
            },
            'bootstrap': ['jquery']
        }
    });

    require([
        'angular',
        'jquery',
        'angular-route',
        'bootstrap',
        'routes'
    ], function (angular, $) {
        $(function () {
            angular.bootstrap(document, ['bitCoinApp']);
        });
    });
})(BitCoinClient || (BitCoinClient = {}));
