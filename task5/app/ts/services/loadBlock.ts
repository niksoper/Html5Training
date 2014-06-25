export class LoadBlock {

	LatestHash: any;
	LatestBlock: any;

	constructor($resource) {
        
		this.LatestHash = $resource('blockexplorer/q/latesthash');
		this.LatestBlock = $resource('blockexplorer/rawblock/:hash');
		
	}

	public Get = (): any => {

		var latestBlock = this.LatestHash.get(function () {
			debugger;
		});

	}
	
}