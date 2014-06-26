import bitCoinApp = require('bitCoinApp');
import explorer = require('controllers/explorer');
import block = require('controllers/block');

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