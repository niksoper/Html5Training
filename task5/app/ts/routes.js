define(["require", "exports", 'bitCoinApp', 'controllers/explorer', 'controllers/block', 'services/loadBlock'], function(require, exports, __bitCoinApp__, __explorer__, __block__, __loader__) {
    var bitCoinApp = __bitCoinApp__;
    var explorer = __explorer__;
    var block = __block__;
    var loader = __loader__;

    bitCoinApp.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'views/explorer.html',
                controller: explorer.ExplorerController
            }).when('/block/:hash', {
                templateUrl: 'views/block.html',
                controller: block.Controller
            }).otherwise({ redirectTo: '/' });
        }
    ]);

    bitCoinApp.factory('loadBlockService', ['$resource', loader.LoadBlock]);
});
