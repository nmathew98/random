var assert = require("assert/strict");
var crypto = require("crypto");

function numbords(x) {
	const words = {
		1: "one",
		2: "two",
		3: "three",
		4: "four",
		5: "five",
		6: "six",
		7: "seven",
		8: "eight",
		9: "nine",
		10: "ten",
		11: "eleven",
		12: "twelve",
		13: "thirteen",
		14: "fourteen",
		15: "fifteen",
		16: "sixteen",
		17: "seventeen",
		18: "eighteen",
		19: "nineteen",
		20: "twenty",
		30: "thirty",
		40: "forty",
		50: "fifty",
		60: "sixty",
		70: "seventy",
		80: "eighty",
		90: "ninety",
		100: "hundred",
		1000: "thousand",
	};

	if (x <= 20) {
		return words[x];
	}
	if (x > 20 && x < 100) {
		const ty = x - (x % Math.pow(10, 1));
		const ones = x % Math.pow(10, 1);

		return `${words[ty]} ${words[ones] ?? ""}`;
	}
	if (x >= 100 && x <= 1000) {
		const sand = Math.floor(x / 1000);
		const dred = Math.floor((x % 1000) / 100);
		const remaining = x % 100;

		const word = [];

		if (sand > 0) word.push(words[sand] + " " + words[1000]);
		if (dred > 0) word.push(words[dred] + " " + words[100]);
		if (remaining > 0) word.push(numbords(remaining));

		return word.join(" and ");
	}
}

function calculateLetters(max) {
	const range = [];
	for (let i = 1; i <= max; i++) range.push(i);

	return range
		.map(x => numbords(x).replace(/\s/g, "").length)
		.reduce((runningTotal, currentValue) => runningTotal + currentValue);
}

const sum = `${calculateLetters(1000)}`;

assert.strictEqual(
	crypto.createHash("md5").update(sum).digest("hex"),
	"6a979d4a9cf85135408529edc8a133d0",
);
