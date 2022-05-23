var assert = require("assert/strict");
var crypto = require("crypto");

// https://stackoverflow.com/questions/17743851/optimise-the-solution-to-project-euler-12-python

function* triangleNumber() {
	// http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/runsums/triNbProof.html
	for (let i = 1; i <= Infinity; i++) {
		const calculateNthTriangleNumber = i => (i * (i + 1)) / 2;

		yield calculateNthTriangleNumber(i);
	}
}

function findTriangleNumberWithOverNDivisors(n) {
	for (let number of triangleNumber()) {
		const factors = [];

		for (let i = 0; i <= Math.sqrt(number) + 1; i++)
			if (number % i === 0) factors.push(i, n / i);

		if (factors.length > n) return number;
	}
}

const number = `${findTriangleNumberWithOverNDivisors(500)}`;
assert.strictEqual(
	crypto.createHash("md5").update(number).digest("hex"),
	"8091de7d285989bbfa9a2f9f3bdcc7c0",
);
