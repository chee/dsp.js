import * as test from "./audio-harness.js"
import * as dsp from "../dsp.js"
import BeatDetektor from "./beatdetektor.js"

let iterations = 1000

let fft = new dsp.FFT(test.frameBufferLength / test.channels, test.rate)
let bd = new BeatDetektor()
let kick_det = new BeatDetektor.modules.vis.BassKick()
let vu = new BeatDetektor.modules.vis.VU()

// var m_BeatTimer = 0
// var m_BeatCounter = 0
// var ftimer = 0

var calcBeat = function () {
	let fb = test.getFramebuffer()
	let signal = dsp.getMono(fb)

	fft.forward(signal)

	var timestamp = new Date().getTime()
	bd.process(timestamp, fft.spectrum)

	// Bass Kick detection
	kick_det.process(bd)
	vu.process(bd)
}

test.runTest(calcBeat, iterations)
