import bc = require('../bitcoin');
import shrink = require('../services/shrinkHash');

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
    shrinkHash: (hash: string) => string;
    $http: ng.IHttpService;

    constructor(
        $scope: IControllerScope<Controller>,
        $routeParams: IHashRouteParams,
        $http: ng.IHttpService,
        shrinkHashService: shrink.ShrinkHash) {

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
        var fractionalPages: number = this.block.n_tx / this.pageSize;
        var remainder: number = this.block.n_tx % this.pageSize;
        var totalPages:number = Math.floor(fractionalPages) + (remainder !== 0 ? 1 : 0);

        this.pages = [];
        for (var i = 1; i <= totalPages; i++) {
            this.pages.push(i);
        }

        if (this.activePage > this.pages.length) {
            this.activePage = this.pages.length;
            this.getTransactionsForPage(this.activePage);
        }
    }

    private getBlock = (
        hash: string,
        setBlock: (rawBlock: bc.IBlock) => void): void => {

        var self = this;

        this.$http.get('/blockexplorer/rawblock/' + hash)
            .then(function (result: ng.IHttpPromiseCallbackArg<bc.IBlock>) {
                setBlock(result.data);
            });

    }

    private getTransactionsForPage(page: number): void {
        var start: number = (page - 1) * this.pageSize;
        var end: number = Math.min(start + this.pageSize, this.block.tx.length);

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