var assert = require("assert/strict");
var crypto = require("crypto");

function difference(n = 100) {
	const range = [];

	for (let i = 1; i <= n; i++) range.push(i);

	const sumOfSquares = range.reduce(
		(runningTotal, currentValue) =>
			runningTotal + Math.pow(currentValue, 2),
		0,
	);

	const squareOfSum = Math.pow(
		range.reduce(
			(runningTotal, currentValue) => runningTotal + currentValue,
			0,
		),
		2,
	);

	return squareOfSum - sumOfSquares;
}

const smallest = `${difference()}`;
assert.strictEqual(
	crypto.createHash("md5").update(smallest).digest("hex"),
	"867380888952c39a131fe1d832246ecc",
);
