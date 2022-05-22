var assert = require("assert/strict");
var crypto = require("crypto");

function findTriplet(sum) {
	const isTriplet = (a, b, c) =>
		Math.pow(a, 2) + Math.pow(b, 2) === Math.pow(c, 2);

	for (let i = 5; i <= Infinity; i++)
		for (let j = 4; j < i; j++)
			for (let k = 3; k < j; k++)
				if (isTriplet(k, j, i)) if (i + j + k === sum) return [i, j, k];
}

const triplet = `${findTriplet(1000).reduce(
	(runningTotal, currentValue) => runningTotal * currentValue,
	1,
)}`;

assert.strictEqual(
	crypto.createHash("md5").update(triplet).digest("hex"),
	"24eaa9820350012ff678de47cb85b639",
);
