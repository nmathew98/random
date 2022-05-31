var assert = require("assert/strict");
var crypto = require("crypto");

function numberOfSundays(start, end) {
	let count = 0;

	for (let year = start; year <= end; year++) {
		for (let month = 1; month <= 12; month++) {
			if (new Date(`${year}/${month}/1`).getDay() === 0) {
				count++;
			}
		}
	}

	return count;
}

const count = `${numberOfSundays(1901, 2000)}`;

assert.strictEqual(
	crypto.createHash("md5").update(count).digest("hex"),
	"a4a042cf4fd6bfb47701cbc8a1653ada",
);
