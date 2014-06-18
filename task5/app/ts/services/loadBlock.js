define(["require", "exports"], function(require, exports) {
    var LoadBlock = (function () {
        function LoadBlock($resource) {
            console.log($resource);
        }
        return LoadBlock;
    })();
    exports.LoadBlock = LoadBlock;
});
