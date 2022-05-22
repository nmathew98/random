var assert = require("assert/strict");
var crypto = require("crypto");

const multiples = [];
for (let i = 1; i < 1000; i++) {
	if (i % 3 === 0 || i % 5 === 0) multiples.push(i);
}

const sum = `${multiples.reduce(
	(runningTotal, current) => runningTotal + current,
	0,
)}`;
assert.strictEqual(
	crypto.createHash("md5").update(sum).digest("hex"),
	"e1edf9d1967ca96767dcc2b2d6df69f4",
);
