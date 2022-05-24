var assert = require("assert/strict");
var crypto = require("crypto");

function factorial(number) {
	let product = 1;

	for (let i = 1; i <= number; i++) product *= i;

	return product;
}

function findNumberOfRoutes(size, cells) {
	return Math.floor(
		factorial(size) / (factorial(cells) * factorial(size - cells)),
	);
}

const numberOfRoutes = `${findNumberOfRoutes(40, 20)}`;
assert.strictEqual(
	crypto.createHash("md5").update(numberOfRoutes).digest("hex"),
	"928f3957168ac592c4215dcd04e0b678",
);
