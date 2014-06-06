var Transform = (function () {
    function Transform() {
    }
    Transform.LittleEndian = function (n) {
        var hexNumber = n.toString(16);

        var padding = '00000000';
        var padAmount = padding.length - hexNumber.length;
        var padded = padding.slice(0, padAmount) + hexNumber;

        var swapped = module.exports.SwapBytes(padded);

        return swapped;
    };

    Transform.SwapBytes = function (hex) {
        var swapped = '';
        var bytes = hex.length / 2;
        for (var i = 0; i < bytes; i++) {
            swapped = hex.slice(2 * i, 2 * i + 2).concat(swapped);
        }

        return swapped;
    };
    return Transform;
})();


module.exports = Transform;

