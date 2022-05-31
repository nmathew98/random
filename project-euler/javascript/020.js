var assert = require("assert/strict");
var crypto = require("crypto");

function factorial(number) {
	let product = BigInt(1);

	for (let i = 1; i <= number; i++) product *= BigInt(i);

	return product;
}

function sumOfDigitsInFactorial(x) {
	return `${factorial(x)}`
		.split("")
		.reduce(
			(runningTotal, currentValue) => runningTotal + +currentValue,
			0,
		);
}

const sum = `${sumOfDigitsInFactorial(100)}`;
assert.strictEqual(
	crypto.createHash("md5").update(sum).digest("hex"),
	"443cb001c138b2561a0d90720d6ce111",
);
