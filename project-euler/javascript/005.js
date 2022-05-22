var assert = require("assert/strict");
var crypto = require("crypto");

function smallestDivisibleByAllInRange(start = 1, end = 20) {
	const range = [];

	for (let i = start; i <= end; i++) range.push(i);

	for (let i = 1; i <= Infinity; i++) {
		if (range.every(j => i % j === 0)) return i;
	}
}

const smallest = `${smallestDivisibleByAllInRange()}`;
assert.strictEqual(
	crypto.createHash("md5").update(smallest).digest("hex"),
	"bc0d0a22a7a46212135ed0ba77d22f3a",
);
