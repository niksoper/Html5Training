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
            this.filterBySearch = function (item) {
                if (!_this.searchText || /^\W*$/.test(_this.searchText)) {
                    return true;
                }

                var matchRegex = new RegExp(_this.searchText, 'i');
                if (matchRegex.test(item.hash)) {
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
            this.addBlock = function (hash, remaining) {
                if (!hash || remaining < 1) {
                    return;
                }

                var self = _this;

                _this.$http.get('/blockexplorer/rawblock/' + hash).then(function (result) {
                    var data = result.data;

                    self.blocks.push(new BlockViewModel(self.blocks.length + 1, data.hash, data.time, data.n_tx));

                    self.addBlock(data.prev_block, remaining - 1);

                    self.nextBlockHash = data.prev_block;

                    return new BlockViewModel(self.blocks.length + 1, data.hash, data.time, data.n_tx);
                }, function (result) {
                    self.getNextHighestHash(function (hash) {
                        self.addBlock(hash, remaining);
                    });
                });
            };
            this.addLatestBlock = function () {
                var self = _this;

                _this.$http.get('/blockexplorer/q/latesthash').then(function (result) {
                    var data = result.data;

                    self.addBlock(data, self.newBlocks);
                }, function (result) {
                    var data = result.data;

                    self.setHashError();
                });
            };
            this.getNextHighestHash = function (reportHash) {
                var self = _this;

                _this.$http.get('/blockexplorer/q/getblockcount').then(function (result) {
                    var targetHeight = parseInt(result.data) - 1;

                    return self.$http.get('/blockexplorer/q/getblockhash/' + targetHeight);
                }).then(function (result) {
                    reportHash(result.data);
                }, function (error) {
                    self.setHashError();
                });
            };
            this.setHashError = function () {
                _this.errorMsg = _this.hashError;
            };
            this.$http = $http;

            $scope.vm = this;

            this.newBlocks = 10;

            this.shrinkHash = shrinkHashService.Shrink;

            this.blocks = [];

            this.hashError = 'Latest hash could not be found.';
        }
        return ExplorerController;
    })();
    exports.ExplorerController = ExplorerController;
});
