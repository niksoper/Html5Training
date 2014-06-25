define(["require", "exports"], function(require, exports) {
    var LoadBlock = (function () {
        function LoadBlock($http) {
            this.Get = function () {
            };
            this.$http = $http;
        }
        return LoadBlock;
    })();
    exports.LoadBlock = LoadBlock;
});
