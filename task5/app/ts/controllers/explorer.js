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
        function ExplorerController($scope, $http, shrinkHashService) {
            var _this = this;
            this.getBlocksViewModel = function () {
                _this.blocks = [];
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
            this.addBlock = function () {
                var self = _this;

                _this.$http.get('/blockexplorer/q/latesthash').success(function (data, status, headers, config) {
                    self.$http.get('/blockexplorer/rawblock/' + data).success(function (data, status, headers, config) {
                        self.blocks.push(new BlockViewModel(self.blocks.length + 1, data.hash, data.time, data.n_tx));
                    }).error(function (data, status, headers, config) {
                    });
                }).error(function (data, status, headers, config) {
                });
            };
            $scope.vm = this;

            this.$http = $http;

            this.shrinkHash = shrinkHashService.Shrink;

            this.getBlocksViewModel();

            this.addBlock();
        }
        return ExplorerController;
    })();
    exports.ExplorerController = ExplorerController;
});
