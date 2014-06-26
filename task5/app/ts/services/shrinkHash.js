define(["require", "exports"], function(require, exports) {
    var ShrinkHash = (function () {
        function ShrinkHash() {
            var _this = this;
            this.Shrink = function (hash) {
                if (!hash) {
                    return null;
                }

                if (hash.length < 15) {
                    return hash;
                }

                if (/^(0{1,4}[^0])|(^[^0])/.test(hash)) {
                    var lastZero = _this.CountLeadningZeroes(hash);

                    if (lastZero !== -1) {
                        return hash.slice(0, lastZero + 3) + '...' + hash.slice(hash.length - 2);
                    } else {
                        return hash.slice(0, 2) + '...' + hash.slice(hash.length - 2);
                    }
                } else {
                    var lastZero = _this.CountLeadningZeroes(hash);

                    var shrunk = '0x' + (lastZero + 1);

                    if (lastZero === hash.length - 1) {
                        return shrunk;
                    } else if (hash.length - lastZero - 1 < '...x...'.length) {
                        return shrunk + '...' + hash.slice(lastZero + 1);
                    }

                    return shrunk + '...' + hash.slice(lastZero + 1, lastZero + 3) + '...' + hash.slice(hash.length - 2);
                }
            };
            this.CountLeadningZeroes = function (hash) {
                var lastZero = -1;
                for (var i = 0; i < hash.length; i++) {
                    if (hash.charAt(i) === '0') {
                        lastZero = i;
                    } else {
                        break;
                    }
                }

                return lastZero;
            };
        }
        return ShrinkHash;
    })();
    exports.ShrinkHash = ShrinkHash;
});
