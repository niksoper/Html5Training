define(["require", "exports", 'bitCoinApp'], function(require, exports, __bitCoinApp__) {
    var bitCoinApp = __bitCoinApp__;

    var ShrinkHash = (function () {
        function ShrinkHash() {
            this.Shrink = function (hash) {
                var zeroes = 0;
                var lastZero = -1;
                for (var i = 0; i < hash.length; i++) {
                    if (hash.charAt(i) === '0') {
                        lastZero = i;
                    } else {
                        break;
                    }
                }

                var shrunk = '';

                if (lastZero >= 0) {
                    shrunk = '0x' + (lastZero + 1) + '...' + hash.substring(lastZero + 1, lastZero + 3) + '...' + hash.substring(hash.length - 2);
                } else {
                    shrunk = hash;
                }

                return shrunk;
            };
            console.log('Called ShrinkHash constructor.');
        }
        return ShrinkHash;
    })();
    exports.ShrinkHash = ShrinkHash;
});
//# sourceMappingURL=shrinkHash.js.map
