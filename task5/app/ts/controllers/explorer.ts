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

    searchText: string;
    blocks: BlockViewModel[];
    shrinkHash: Function;
    
    constructor($scope, loadBlockService, shrinkHashService) {
        $scope.vm = this;        

        debugger;
        loadBlockService.Get();

        this.shrinkHash = shrinkHashService.Shrink;

        this.getBlocksViewModel();
    }

    getBlocksViewModel = (): void => {
        this.blocks = [];
        for (var i = 0; i < blocks.length; i++) {

            var b: bc.IBlock = blocks[i];

            this.blocks.push(new BlockViewModel(
                i+1,
                b.hash,
                b.time,
                b.n_tx));                
        }
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
}