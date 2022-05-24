var assert = require("assert/strict");
var crypto = require("crypto");

function* collatzSequence(start) {
	for (let i = start; i >= 1; ) {
		if (i % 2 === 0) {
			i = i / 2;
		} else {
			i = 3 * i + 1;
		}

		yield i;
	}
}

function findLongestChain(upperBound) {
	let longestChainLength = -1;
	let numberWithLongestChain = -1;

	for (let i = 1; i <= upperBound; i++) {
		let lengthOfSequence = 0;

		for (let x of collatzSequence(i)) {
			lengthOfSequence++;

			if (x === 1) break;
		}

		if (lengthOfSequence > longestChainLength) {
			longestChainLength = lengthOfSequence;
			numberWithLongestChain = i;
		}
	}

	return numberWithLongestChain;
}

const numberWithLongestChain = `${findLongestChain(Math.pow(10, 6))}`;
assert.strictEqual(
	crypto.createHash("md5").update(numberWithLongestChain).digest("hex"),
	"5052c3765262bb2c6be537abd60b305e",
);
