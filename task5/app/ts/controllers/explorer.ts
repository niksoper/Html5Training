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
    
    constructor($scope) {
        $scope.vm = this;

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

    shrinkHash = (hash: string): string => {

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
            shrunk =
                '0x' + (lastZero + 1) + '...' +
                hash.substring(lastZero + 1, lastZero + 3) + '...' +
                hash.substring(hash.length - 2);
        } else {
            shrunk = hash;
        }

        return shrunk;
    }
}