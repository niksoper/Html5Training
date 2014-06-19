import bitCoinApp = require('bitCoinApp');

export class Hello {

	Say = (): string => {
		return "Hello";
	}
}

bitCoinApp.service('helloService', Hello);