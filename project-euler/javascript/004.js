var assert = require("assert/strict");
var crypto = require("crypto");

function findLargestPalindromeProduct(magnitude = 3) {
	const palindromes = [];

	const initial = +"9".repeat(magnitude);
	const delta = Math.pow(10, magnitude - 1);

	for (let i = initial; i >= initial - delta; i--) {
		for (let j = initial; j >= initial - delta; j--) {
			const product = `${i * j}`;

			if (product === product.split("").reverse().join("")) {
				palindromes.push(+product);
			}
		}
	}

	return Math.max(...palindromes);
}

const largest = `${findLargestPalindromeProduct()}`;
assert.strictEqual(
	crypto.createHash("md5").update(largest).digest("hex"),
	"d4cfc27d16ea72a96b83d9bdef6ce2ec",
);
