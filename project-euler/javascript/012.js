var assert = require("assert/strict");
var crypto = require("crypto");

function* triangleNumber() {
	let sum = 0;
	let j = 0;

	for (let i = 1; i <= Infinity; i++) {
		for (; j <= i; j++) sum += j;

		yield sum;
	}
}

function findTriangleNumberWithOverNDivisors(n) {
	for (let number of triangleNumber()) {
		const factors = [];

		for (let i = 0; i <= number; i++)
			if (number % i === 0) factors.push(number);

		if (factors.length > n) return number;
	}
}

const number = `${findTriangleNumberWithOverNDivisors(500)}`;
assert.strictEqual(
	crypto.createHash("md5").update(number).digest("hex"),
	"8091de7d285989bbfa9a2f9f3bdcc7c0",
);
