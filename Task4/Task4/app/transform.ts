class Transform {

	public static LittleEndian = (n: number): string => {
			
		// convert the number to hex
		var hexNumber = n.toString(16);

		// pad the hex string to 8 characters
		var padding = '00000000';
		var padAmount = padding.length - hexNumber.length;
		var padded = padding.slice(0, padAmount) + hexNumber;

		var swapped = Transform.SwapBytes(padded);

		return swapped;
	}

	public static SwapBytes = (hex: string): string => {

		// reverse the hex string in pairs of characters (bytes)
		var swapped = '';
		var bytes = hex.length / 2;
		for (var i = 0; i < bytes; i++) {
			swapped = hex.slice(2*i, 2*i+2).concat(swapped);
		}

		return swapped;
	}
}

export = Transform;