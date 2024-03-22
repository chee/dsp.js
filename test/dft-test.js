import * as test from "./audio-harness.js"
import * as dsp from "../dsp.js"

var iterations = 100
var dft = new dsp.DFT(test.frameBufferLength / test.channels, test.rate)

var calcDFT = function () {
	var fb = test.getFramebuffer(),
		signal = dsp.getMono(fb)

	dft.forward(signal)
}

test.runTest(calcDFT, iterations)
