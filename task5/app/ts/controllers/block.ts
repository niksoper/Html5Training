import blocks = require('../blocks');
import bc = require('../bitcoin');

export class TxViewModel {
    constructor(public hash: string, public index: number) {
    }
}

export class Controller {

    block: bc.IBlock;
    pages: number[];
    activePage: number;
    transactions: TxViewModel[];
    pageSize: number;
    shrinkHash: Function;
    $http: ng.IHttpService;

    constructor($scope, $routeParams, $http: ng.IHttpService, shrinkHashService) {

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

    private setBlock = (rawBlock: bc.IBlock): void => {
        this.block = rawBlock;
        this.pageSize = 10;
        this.setActivePage(1);
        this.setPages();
    }

    private setPages = (): void => {
        var fractionalPages = this.block.n_tx / this.pageSize;
        var remainder = this.block.n_tx % this.pageSize;
        var totalPages = Math.floor(fractionalPages) + (remainder !== 0 ? 1 : 0);

        this.pages = [];
        for (var i = 1; i <= totalPages; i++) {
            this.pages.push(i);
        }

        if (this.activePage > this.pages.length) {
            this.activePage = this.pages.length;
            this.getTransactionsForPage(this.activePage);
        }
    }

    private getBlock = (hash: string, setBlock: Function): void => {

        var self = this;

        this.$http.get('/blockexplorer/rawblock/' + hash)
            .then(function (result) {

                setBlock(result.data);

            },
            function (error) {

            });

    }

    private getTransactionsForPage(page: number): void {
        var start = (page - 1) * this.pageSize;
        var end = Math.min(start + this.pageSize, this.block.tx.length);

        this.transactions = [];
        for (var i = start; i < end; i++) {
            this.transactions.push(new TxViewModel(this.block.tx[i].hash, i + 1));
        } 
    }

    public setActivePage = (page: number): void => {
        this.activePage = page;
        this.getTransactionsForPage(page);
    }
 }