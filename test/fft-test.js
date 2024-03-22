import * as test from "./audio-harness.js"
import * as dsp from "../dsp.js"

var iterations = 100
var fft = new dsp.FFT(test.frameBufferLength / test.channels, test.rate)

var calcFFT = function () {
	var fb = test.getFramebuffer(),
		signal = dsp.getMono(fb)

	fft.forward(signal)
}

test.runTest(calcFFT, iterations)
