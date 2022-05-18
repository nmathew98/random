const Benchmark = require("benchmark");
const wasm = require("./pkg/path_tree");

let router = wasm.Router.create_router();

const benchSets = [
	{
		title: "static route",
		requests: [{ path: "/choot" }],
	},
	{
		title: "dynamic route",
		requests: [{ path: "/choot/123" }],
	},
];

async function test() {
	/**
	 * unjs/radix3 results:
	 * --- static route ---

	lookup x 66,938,073 ops/sec ±0.64% (89 runs sampled)
	Stats:
	- /choot: 340616216

	--- dynamic route ---

	lookup x 858,570 ops/sec ±3.68% (83 runs sampled)
	Stats:
	- /choot/123: 4485747
	 */
	/**
	 * path-tree wasm
	 *
	 * static route
		lookup x 260,069 ops/sec ±2.17% (79 runs sampled)
		{ '/choot': 1336802 }
		dynamic route
		lookup x 209,569 ops/sec ±2.51% (80 runs sampled)
		{ '/choot/123': 1047160 }
	 */
	for (const bench of benchSets) {
		console.log(bench.title);

		const suite = new Benchmark.Suite();
		const stats = {};

		const routes = [
			"/hello",
			"/cool",
			"/hi",
			"/helium",
			"/cooool",
			"/chrome",
			"/choot",
			"/choot/:choo",
			"/ui/**",
			"/ui/components/**",
		];

		routes.forEach((route, index) => router.insert(route, index + 1));
		suite.add("lookup", () => {
			for (const req of bench.requests) {
				const match = router.find(req.path);
				if (!match.key) {
					stats[_nomatch] = (stats[_nomatch] || 0) + 1;
				}
				stats[req.path] = (stats[req.path] || 0) + 1;
			}
		});
		suite.on("cycle", event => {
			console.log(String(event.target));
		});
		const promise = new Promise(resolve =>
			suite.on("complete", () => resolve()),
		);
		suite.run({ async: true });
		await promise;
		console.log(stats);
	}
}

test();
