module Mastery {
    'use strict';

    require.config({

        paths: {
            // set paths to requirejs modules so they can be loaded by requirejs
            'angular': '../Scripts/angular',
            'angular-route': '../Scripts/angular-route',
            'jquery': '../Scripts/jquery-1.9.0',
            'bootstrap': '../Scripts/bootstrap'
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