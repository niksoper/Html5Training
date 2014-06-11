define(["require", "exports", 'app', 'controllers/explorer', 'controllers/block'], function(require, exports, app, explorer, block) {
    app.config([
        '$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/views/explorer.html',
                controller: explorer.ExplorerController
            }).when('/block/:hash', {
                templateUrl: 'app/views/block.html',
                controller: block.Controller
            }).otherwise({ redirectTo: '/' });
        }
    ]);
});
//# sourceMappingURL=routes.js.map
