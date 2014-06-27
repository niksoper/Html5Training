import blocks = require('../blocks');
import bc = require('../bitcoin');

export class BlockViewModel {
    constructor(
        public index: number,
        public hash: string,
        public time: number,
        public n_tx: number) {
    }
}

export class ExplorerController {

    $http: ng.IHttpService;

    searchText: string;
    blocks: BlockViewModel[];
    shrinkHash: Function;
    newBlocks: number;
    nextBlockHash: string;
    errorMsg: string;
    hashError: string;
    
    constructor($scope, $http: ng.IHttpService, shrinkHashService) {
        
        this.$http = $http;

        $scope.vm = this;        

        this.newBlocks = 10;

        this.shrinkHash = shrinkHashService.Shrink;

        this.blocks = [];

        this.hashError = 'Latest hash could not be found.'
    }

    filterBySearch = (item: BlockViewModel): boolean => {

        if (!this.searchText || /^\W*$/.test(this.searchText)) {
            return true;
        }

        var matchRegex = new RegExp(this.searchText, 'i');
        if (matchRegex.test(item.hash)) {
            return true;
        }

        if (this.searchText.indexOf('#') === 0) {
            var numberSearch = parseInt(this.searchText.substring(1));
            if (numberSearch !== undefined && item.index === numberSearch) {
                return true;
            }
        }

        return false;
    }

    addBlock = (hash: string, remaining: number): void => {

        if (!hash || remaining < 1) {
            return;
        }

        var self = this;

        this.$http.get('/blockexplorer/rawblock/' + hash)
            .then(function (result) {

                var data = result.data;

                self.blocks.push(new BlockViewModel(
                    self.blocks.length + 1,
                    data.hash,
                    data.time,
                    data.n_tx));

                self.addBlock(data.prev_block, remaining - 1);

                self.nextBlockHash = data.prev_block;

            },
            (result) => {

                /* Failure is most likely caused by the latest block being unavailable
                   so fall back to the next highest hash in the block chain.
                */

                self.getNextHighestHash().then((hash: string):void => {
                        self.addBlock(hash, remaining);
                    });
            });
    }

    addLatestBlock = (): void => {

        var self = this;

        this.$http.get('/blockexplorer/q/latesthash')
            .then((result) => {

                var data = result.data;

                self.addBlock(data, self.newBlocks);

            },
            (result) => {

                var data = result.data;

                self.setHashError();

            });

    }

    getNextHighestHash = () => {

        var self = this;

        return this.$http.get('/blockexplorer/q/getblockcount')
            .then(function (result) {

                var targetHeight = parseInt(result.data) - 1;

                return self.$http.get('/blockexplorer/q/getblockhash/' + targetHeight);

            })
            .then((result: any): string => {

                return result.data;

            });
    }

    setHashError = (): void => {

        this.errorMsg = this.hashError;

    }

}