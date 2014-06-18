define(["require", "exports", '../blocks'], function(require, exports, __blocks__) {
    var blocks = __blocks__;
    

    var BlockViewModel = (function () {
        function BlockViewModel(index, hash, time, n_tx) {
            this.index = index;
            this.hash = hash;
            this.time = time;
            this.n_tx = n_tx;
        }
        return BlockViewModel;
    })();
    exports.BlockViewModel = BlockViewModel;

    var ExplorerController = (function () {
        function ExplorerController($scope, loadBlockService) {
            var _this = this;
            this.getBlocksViewModel = function () {
                _this.blocks = [];
                for (var i = 0; i < blocks.length; i++) {
                    var b = blocks[i];

                    _this.blocks.push(new BlockViewModel(i + 1, b.hash, b.time, b.n_tx));
                }
            };
            this.filterBySearch = function (item) {
                if (!_this.searchText) {
                    return true;
                }

                if (item.hash.indexOf(_this.searchText) != -1) {
                    return true;
                }

                if (_this.searchText.indexOf('#') === 0) {
                    var numberSearch = parseInt(_this.searchText.substring(1));
                    if (numberSearch !== undefined && item.index === numberSearch) {
                        return true;
                    }
                }

                return false;
            };
            this.shrinkHash = function (hash) {
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
            $scope.vm = this;

            this.getBlocksViewModel();
        }
        return ExplorerController;
    })();
    exports.ExplorerController = ExplorerController;
});
