define(["require", "exports", 'bitCoinApp'], function(require, exports, __bitCoinApp__) {
    var bitCoinApp = __bitCoinApp__;

    var Hello = (function () {
        function Hello() {
            this.Say = function () {
                return "Hello";
            };
        }
        return Hello;
    })();
    exports.Hello = Hello;

    bitCoinApp.service('helloService', Hello);
});
