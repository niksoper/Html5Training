export class ShrinkHash {

    public Shrink = (hash: string): string => {

        if (!hash) {
            return null;
        }

        if (hash.length < 15) {
            return hash;
        }

        // this tests whether the hash has four or fewer leading zeroes
        if (/^(0{1,4}[^0])|(^[^0])/.test(hash)) {
        
            var lastZero = this.CountLeadningZeroes(hash);

            if (lastZero !== -1) {

                return hash.slice(0, lastZero + 3) + '...' + hash.slice(hash.length - 2);

            } else {

                return hash.slice(0, 2) + '...' + hash.slice(hash.length - 2);
            }

        } else {

            // failing the regex means that the hash starts with 5 or more leading zeroes

            var lastZero = this.CountLeadningZeroes(hash);

            var shrunk = '0x' + (lastZero + 1);

            if (lastZero === hash.length - 1) {

                return shrunk;

            } else if (hash.length - lastZero - 1 < '...x...'.length) {

                return shrunk + '...' + hash.slice(lastZero + 1);

            }

            return shrunk + '...' +
                hash.slice(lastZero + 1, lastZero + 3) + '...' +
                hash.slice(hash.length - 2);
        }
    }

    CountLeadningZeroes = (hash: string): number => {

        var lastZero = -1;
        for (var i = 0; i < hash.length; i++) {
            if (hash.charAt(i) === '0') {
                lastZero = i;
            } else {
                break;
            }
        }

        return lastZero;
    }
}