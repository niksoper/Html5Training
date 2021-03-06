﻿import bc = require('../bitcoin');
import shrink = require('../services/shrinkHash');
import verify = require('../services/verifyBlockHash');

export class BlockViewModel {

    public verified: string;

    constructor(
        public index: number,
        public hash: string,
        public time: number,
        public txValues: Array<number>) {
    }
}

export class ExplorerController {

    $http: ng.IHttpService;

    shrinkHash: (hash: string) => string;
    verifyBlockService: (block: bc.IBlock) => ng.IPromise<boolean>;

    searchText: string;
    blocks: BlockViewModel[];
    newBlocks: number;
    nextBlockHash: string;
    errorMsg: string;
    hashError: string;
    
    constructor(
        $scope: IControllerScope<ExplorerController>,
        $http: ng.IHttpService,
        shrinkHashService: shrink.ShrinkHash,
        verifyBlockHashService: verify.VerifyHash) {
        
        this.$http = $http;

        $scope.vm = this;        

        this.newBlocks = 12;

        this.shrinkHash = shrinkHashService.Shrink;
        this.verifyBlockService = verifyBlockHashService.Verify;

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

    getTxValues = (transactions: Array<bc.ITransaction>): Array<number> => {

        return transactions.map(function (t: bc.ITransaction) {

            var total: number = 0;

            t.out.forEach(function (out: bc.ITOut) {
                total += parseFloat(out.value);
            });

            return total;

        });

    }

    addBlock = (hash: string, remaining: number): void => {

        if (!hash || remaining < 1) {
            return;
        }

        var self = this;

        this.$http.get('/blockexplorer/rawblock/' + hash)
            .then((response: ng.IHttpPromiseCallbackArg<bc.IBlock>): void => {

                var blockData: bc.IBlock = response.data;

                var blockTxValues = this.getTxValues(blockData.tx);

                self.blocks.push(new BlockViewModel(
                    self.blocks.length + 1,
                    blockData.hash,
                    blockData.time,
                    blockTxValues));

                self.addBlock(blockData.prev_block, remaining - 1);

                self.nextBlockHash = blockData.prev_block;

            },
            (response: any): any => {

                /* Failure is most likely caused by the latest block being unavailable
                   so fall back to the next highest hash in the block chain.
                */

                self.getNextHighestHash().then((hash: string):void => {
                        self.addBlock(hash, remaining);
                    });
            });
    }

    verifyBlock = (blockViewModel: BlockViewModel): void => {

        this.$http.get('/blockexplorer/rawblock/' + blockViewModel.hash)
            .then((response: ng.IHttpPromiseCallbackArg<bc.IBlock>): void => {

                var coinFlip = Math.random();
                console.log(coinFlip);
                if (coinFlip > 0.5) {
                    response.data.nonce++;
                }

                this.verifyBlockService(response.data)
                    .then((verifyResponse: ng.IHttpPromiseCallbackArg<string>): void => {

                        blockViewModel.verified = verifyResponse.data === 'true' ? 'VERIFIED' : 'WRONG!!!';

                    });

            });

    }

    addLatestBlock = (): void => {

        var self = this;

        this.$http.get('/blockexplorer/q/latesthash')
            .then((result: ng.IHttpPromiseCallbackArg<string>) => {

                var data: string = result.data;

                self.addBlock(data, self.newBlocks);

            },
            (result: ng.IHttpPromiseCallbackArg<string>) => {

                self.setHashError();

            });

    }

    getNextHighestHash = () => {

        var self = this;

        return this.$http.get('/blockexplorer/q/getblockcount')
            .then(function (result: ng.IHttpPromiseCallbackArg<string>) {

                var targetHeight: number = parseInt(result.data) - 1;

                return self.$http.get('/blockexplorer/q/getblockhash/' + targetHeight);

            })
            .then((result: ng.IHttpPromiseCallbackArg<string>): string => {

                return result.data;

            },
            (reason: any): any => {
                self.setHashError();
            });
    }

    setHashError = (): void => {

        this.errorMsg = this.hashError;

    }

}