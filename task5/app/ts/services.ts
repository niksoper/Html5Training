import bitCoinApp = require('bitCoinApp');
import shrinker = require('services/shrinkHash');

bitCoinApp.service('shrinkHashService', [shrinker.ShrinkHash]);