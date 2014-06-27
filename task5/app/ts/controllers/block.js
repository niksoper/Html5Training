define(["require", "exports", '../blocks'], function(require, exports, __blocks__) {
    var blocks = __blocks__;
    

    var TxViewModel = (function () {
        function TxViewModel(hash, index) {
            this.hash = hash;
            this.index = index;
        }
        return TxViewModel;
    })();
    exports.TxViewModel = TxViewModel;

    var Controller = (function () {
        function Controller($scope, $routeParams, $http, shrinkHashService) {
            var _this = this;
            this.setBlock = function (rawBlock) {
                _this.block = rawBlock;
                _this.pageSize = 10;
                _this.setActivePage(1);
                _this.setPages();
            };
            this.setPages = function () {
                var fractionalPages = _this.block.n_tx / _this.pageSize;
                var remainder = _this.block.n_tx % _this.pageSize;
                var totalPages = Math.floor(fractionalPages) + (remainder !== 0 ? 1 : 0);

                _this.pages = [];
                for (var i = 1; i <= totalPages; i++) {
                    _this.pages.push(i);
                }

                if (_this.activePage > _this.pages.length) {
                    _this.activePage = _this.pages.length;
                    _this.getTransactionsForPage(_this.activePage);
                }
            };
            this.getBlock = function (hash, setBlock) {
                var self = _this;

                _this.$http.get('/blockexplorer/rawblock/' + hash).then(function (result) {
                    setBlock(result.data);
                }, function (error) {
                });
            };
            this.setActivePage = function (page) {
                _this.activePage = page;
                _this.getTransactionsForPage(page);
            };
            $scope.vm = this;

            this.$http = $http;

            this.shrinkHash = shrinkHashService.Shrink;

            this.getBlock($routeParams.hash, this.setBlock);

            var controller = this;

            $scope.$watch('vm.pageSize', function () {
                controller.setActivePage(controller.activePage);
                controller.setPages();
            });
        }
        Controller.prototype.getTransactionsForPage = function (page) {
            var start = (page - 1) * this.pageSize;
            var end = Math.min(start + this.pageSize, this.block.tx.length);

            this.transactions = [];
            for (var i = start; i < end; i++) {
                this.transactions.push(new TxViewModel(this.block.tx[i].hash, i + 1));
            }
        };
        return Controller;
    })();
    exports.Controller = Controller;
});
