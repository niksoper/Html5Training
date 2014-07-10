import bitCoinApp = require('bitCoinApp');
import shrinker = require('services/shrinkHash');
import verifier = require('services/verifyBlockHash');

bitCoinApp.service('shrinkHashService', [shrinker.ShrinkHash]);
bitCoinApp.service('verifyBlockHashService', [verifier.VerifyHash]);
