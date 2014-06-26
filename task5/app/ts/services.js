define(["require", "exports", 'bitCoinApp', 'services/shrinkHash'], function(require, exports, __bitCoinApp__, __shrinker__) {
    var bitCoinApp = __bitCoinApp__;
    var shrinker = __shrinker__;

    bitCoinApp.service('shrinkHashService', [shrinker.ShrinkHash]);
});
