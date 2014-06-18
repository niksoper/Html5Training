module Mastery {
    'use strict';

    require.config({

        paths: {
            // set paths to requirejs modules so they can be loaded by requirejs
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

    // run a function once the dependencies have been loaded by requirejs
    require(
        ['angular', 'jquery', 'angular-route', 'bootstrap',
         'routes'],
        function (angular: ng.IAngularStatic, $: JQueryStatic) {

            $(function () {
                angular.bootstrap(document, ['app']);
            });
        }
        );
}