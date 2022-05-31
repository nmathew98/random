var assert = require("assert/strict");
var crypto = require("crypto");

function sumOfDivisors(n) {
	let sum = 0;

	for (let i = 0; i < n; i++) if (n % i === 0) sum += i;

	return sum;
}

function sumOfAmicableNumbers(max) {
	const sums = {};

	for (let i = 1; i < max; i++) {
		sums[i] = sumOfDivisors(i);
	}

	return Object.keys(sums)
		.filter(x => x == sums[sums[x]] && x != sums[x])
		.reduce(
			(runningTotal, currentValue) => runningTotal + +currentValue,
			0,
		);
}

const sum = `${sumOfAmicableNumbers(10000)}`;
assert.strictEqual(
	crypto.createHash("md5").update(sum).digest("hex"),
	"51e04cd4e55e7e415bf24de9e1b0f3ff",
);
