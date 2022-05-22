var assert = require("assert/strict");
var crypto = require("crypto");

function findLargestPalindromeProduct() {
	const palindromes = [];

	for (let i = 999; i >= 100; i--) {
		for (let j = 999; j >= 100; j--) {
			const product = `${i * j}`;

			if (product === product.split("").reverse().join("")) {
				palindromes.push(product);
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
