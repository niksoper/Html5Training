define(["require", "exports", 'bitCoinApp', 'controllers/explorer', 'controllers/block'], function(require, exports, __bitCoinApp__, __explorer__, __block__) {
    var bitCoinApp = __bitCoinApp__;
    var explorer = __explorer__;
    var block = __block__;

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
});
