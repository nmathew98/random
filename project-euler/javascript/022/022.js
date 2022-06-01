var assert = require("assert/strict");
var crypto = require("crypto");
var fs = require("fs/promises");
var path = require("path");

async function scoreNames(filePath) {
	const file = await fs.readFile(filePath);

	const names = file
		.toString()
		.replaceAll('"', "")
		.split(",")
		.sort()
		.map(name => name.toUpperCase())
		.reduce(
			(scores, name) => ({
				...scores,
				[name]: name
					.split("")
					.reduce(
						(score, char) =>
							score +
							(char.charCodeAt(0) - "A".charCodeAt(0)) +
							1,
						0,
					),
			}),
			Object.create(null),
		);

	return Object.keys(names).reduce(
		(runningTotal, name, index) => runningTotal + names[name] * (index + 1),
		0,
	);
}

scoreNames(path.resolve(__dirname, "names.txt")).then(result =>
	assert.strictEqual(
		crypto.createHash("md5").update(`${result}`).digest("hex"),
		"f2c9c91cb025746f781fa4db8be3983f",
	),
);
