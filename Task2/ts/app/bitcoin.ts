
export interface ITransaction {
	hash: string;
	ver: number;
    vin_sz: number;
    vout_sz: number;
    lock_time: number;
    size: number;
    in: any;
    out: any;
}

export interface IBlock {
	hash: string;
    ver: number;
    prev_block: string;
    mrkl_root: string;
    time: number;
    bits: number;
    nonce: number;
    n_tx: number;
    size: number;
    tx: ITransaction[];
    mrkl_tree: string[];
}