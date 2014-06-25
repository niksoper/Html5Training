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
    
    constructor($scope, $http: ng.IHttpService, shrinkHashService) {
        
        this.$http = $http;

        $scope.vm = this;        

        this.newBlocks = 10;

        this.shrinkHash = shrinkHashService.Shrink;

        this.blocks = [];
    
        this.addLatestBlock();
    }

    filterBySearch = (item: BlockViewModel): boolean => {

        if (!this.searchText) {
            return true;
        }

        if (item.hash.indexOf(this.searchText) != -1) {
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

        if (remaining > 0) {

            var self = this;

            this.$http.get('/blockexplorer/rawblock/' + hash)
                .success(function (data, status, headers, config) {

                    self.blocks.push(new BlockViewModel(
                        self.blocks.length + 1,
                        data.hash,
                        data.time,
                        data.n_tx));

                    self.addBlock(data.prev_block, remaining - 1);

                    self.nextBlockHash = data.prev_block;

                })
                .error(function (data, status, headers, config) {

                });
        }
    }

    addLatestBlock = (): void => {

        var self = this;

        this.$http.get('/blockexplorer/q/latesthash')
            .success(function (data, status, headers, config) {

                self.addBlock(data, self.newBlocks);

            })
            .error(function (data, status, headers, config) {

                self.errorMsg = 'Latest hash could not be found.';

            });

    }

}