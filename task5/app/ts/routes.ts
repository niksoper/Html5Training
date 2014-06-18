import app = require('app');
import explorer = require('controllers/explorer');
import block = require('controllers/block');

app.config(['$routeProvider',
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