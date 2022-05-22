var assert = require("assert/strict");
var crypto = require("crypto");

function findPrimeFactors(n) {
	const factors = [];

	for (let divisor = 2, x = n; x >= 2; divisor++) {
		if (divisor in factors) continue;

		if (x % divisor === 0) {
			factors.push(divisor);
			x = x / divisor;
		}
	}

	return factors;
}

const largest = `${Math.max(...findPrimeFactors(600851475143))}`;
assert.strictEqual(
	crypto.createHash("md5").update(largest).digest("hex"),
	"94c4dd41f9dddce696557d3717d98d82",
);
