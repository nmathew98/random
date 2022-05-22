var assert = require("assert/strict");
var crypto = require("crypto");

function findAllPrimesBelow(maximum) {
	const primes = [2, 3];

	for (let i = 5; i <= Infinity; i++) {
		if (i > maximum) return primes;
		if (primes.some(j => i % j === 0)) continue;

		primes.push(i);
	}
}

const sum = `${findAllPrimesBelow(2 * Math.pow(10, 6)).reduce(
	(runningTotal, currentValue) => runningTotal + currentValue,
	0,
)}`;

assert.strictEqual(
	crypto.createHash("md5").update(sum).digest("hex"),
	"d915b2a9ac8749a6b837404815f1ae25",
);
