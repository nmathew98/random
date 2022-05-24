var assert = require("assert/strict");
var crypto = require("crypto");

function sumOfDigits(x) {
	const bigX = BigInt(x);

	return bigX
		.toString()
		.split("")
		.reduce(
			(runningTotal, currentValue) => runningTotal + +currentValue,
			0,
		);
}

const sum = `${sumOfDigits(Math.pow(2, 1000))}`;
assert.strictEqual(
	crypto.createHash("md5").update(sum).digest("hex"),
	"6a5889bb0190d0211a991f47bb19a777",
);
