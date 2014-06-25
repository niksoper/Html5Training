define(["require", "exports"], function(require, exports) {
    var LoadBlock = (function () {
        function LoadBlock($resource) {
            var _this = this;
            this.Get = function () {
                var latestBlock = _this.LatestHash.get(function () {
                    debugger;
                });
            };
            this.LatestHash = $resource('blockexplorer/q/latesthash');
            this.LatestBlock = $resource('blockexplorer/rawblock/:hash');
        }
        return LoadBlock;
    })();
    exports.LoadBlock = LoadBlock;
});
