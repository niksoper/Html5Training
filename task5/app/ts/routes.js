define(["require", "exports", 'app', 'controllers/explorer', 'controllers/block'], function(require, exports, __app__, __explorer__, __block__) {
    var app = __app__;
    var explorer = __explorer__;
    var block = __block__;

    app.config([
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
