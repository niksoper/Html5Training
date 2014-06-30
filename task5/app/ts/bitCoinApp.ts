/// <amd-dependency path="angular-route" />
/// <amd-dependency path="angular-resource" />

import angular = require('angular');

var bitCoinApp = angular.module('bitCoinApp', ['ngRoute', 'ngResource']);

export = bitCoinApp;