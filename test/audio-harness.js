let startTime, totalTime

export function calcTime() {
	totalTime = new Date().getTime() - startTime
}

export function printResults(iterations) {
	console.log(
		"Total Time: " +
			totalTime +
			"ms for " +
			iterations +
			" iterations, " +
			totalTime / iterations +
			"ms per iteration."
	)
}

export function runTest(test, iterations) {
	startTime = new Date().getTime()
	for (var i = 0; i < iterations; i++) {
		test()
	}
	calcTime()
	printResults(iterations)
}

export * from "./samples.js"
