var BitCoinClient;
(function (BitCoinClient) {
    'use strict';

    require.config({
        paths: {
            // set paths to requirejs modules so they can be loaded by requirejs
            'angular': '../bower_components/angular/angular',
            'angular-route': '../bower_components/angular-route/angular-route',
            'angular-resource': '../bower_components/angular-resource/angular-resource',
            'jquery': '../bower_components/jquery/jquery',
            'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
            'd3': '../bower_components/d3/d3'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'angular-route': {
                deps: ['angular']
            },
            'angular-resource': {
                deps: ['angular']
            },
            'bootstrap': ['jquery'],
            'd3': {
                exports: 'd3'
            }
        }
    });

    // run a function once the dependencies have been loaded by requirejs
    require([
        'angular', 'jquery', 'bootstrap',
        'routes', 'services'], function (angular, $) {
        $(function () {
            angular.bootstrap(document, ['bitCoinApp']);
        });
    });
})(BitCoinClient || (BitCoinClient = {}));
//# sourceMappingURL=main.js.map
