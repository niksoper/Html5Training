import bitCoinApp = require('bitCoinApp');
import explorer = require('controllers/explorer');
import block = require('controllers/block');
import loader = require('services/loadBlock');
import shrinker = require('services/shrinkHash');

bitCoinApp.config(['$routeProvider',
    function ($routeProvider: ng.route.IRouteProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'views/explorer.html',
                controller: explorer.ExplorerController
            })
            .when('/block/:hash', {
                templateUrl: 'views/block.html',
                controller: block.Controller
            })
            .otherwise({ redirectTo: '/' });

    }
]);

bitCoinApp.service('loadBlockService', ['$resource', loader.LoadBlock]);
bitCoinApp.service('shrinkHashService', [shrinker.ShrinkHash]);