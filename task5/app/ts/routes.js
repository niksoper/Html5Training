define(["require", "exports", 'bitCoinApp', 'controllers/explorer', 'controllers/block', 'services/loadBlock', 'services/shrinkHash'], function(require, exports, __bitCoinApp__, __explorer__, __block__, __loader__, __shrinker__) {
    var bitCoinApp = __bitCoinApp__;
    var explorer = __explorer__;
    var block = __block__;
    var loader = __loader__;
    var shrinker = __shrinker__;

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

    bitCoinApp.service('loadBlockService', ['$resource', loader.LoadBlock]);
    bitCoinApp.service('shrinkHashService', [shrinker.ShrinkHash]);
});
//# sourceMappingURL=routes.js.map
