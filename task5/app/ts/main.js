var Mastery;
(function (Mastery) {
    'use strict';

    require.config({
        paths: {
            'angular': '../bower_components/angular/angular',
            'angular-route': '../bower_components/angular-route/angular-route',
            'jquery': '../bower_components/jquery/jquery',
            'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap'
        },
        shim: {
            'angular': {
                exports: 'angular'
            },
            'angular-route': ['angular'],
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
            angular.bootstrap(document, ['app']);
        });
    });
})(Mastery || (Mastery = {}));
