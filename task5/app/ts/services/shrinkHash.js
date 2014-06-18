define(["require", "exports", 'app'], function(require, exports, __app__) {
    var app = __app__;

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
        }
        return ShrinkHash;
    })();
    exports.ShrinkHash = ShrinkHash;

    app.factory('shrinkHashService', ShrinkHash);
});
