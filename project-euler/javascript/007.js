var assert = require("assert/strict");
var crypto = require("crypto");

function findNthPrime(n) {
	const primes = [2, 3];

	for (let i = 5; i <= Infinity; i++) {
		if (primes.some(j => i % j === 0)) continue;

		primes.push(i);

		if (primes.length === n) return primes.pop();
	}
}

const nthPrime = `${findNthPrime(10001)}`;
assert.strictEqual(
	crypto.createHash("md5").update(nthPrime).digest("hex"),
	"8c32ab09ec0210af60d392e9b2009560",
);
