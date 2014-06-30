define(["require", "exports", 'bitCoinApp', 'controllers/explorer', 'controllers/block'], function(require, exports, bitCoinApp, explorer, block) {
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
//# sourceMappingURL=routes.js.map
