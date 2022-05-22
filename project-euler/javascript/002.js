var assert = require("assert/strict");
var crypto = require("crypto");

function* fibonnaci() {
	let [a, b] = [0, 1];

	while (true) {
		yield a;

		const oldB = b;
		b = a + b;
		a = oldB;
	}
}

const evenTerms = [];
for (let term of fibonnaci()) {
	if (term <= 4 * Math.pow(10, 6)) {
		if (term % 2 === 0) evenTerms.push(term);
	} else {
		break;
	}
}

const sum = `${evenTerms.reduce(
	(runningTotal, current) => runningTotal + current,
	0,
)}`;
assert.strictEqual(
	crypto.createHash("md5").update(sum).digest("hex"),
	"4194eb91842c8e7e6df099ca73c38f28",
);
