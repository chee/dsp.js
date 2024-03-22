/*
 *  DSP.js - a comprehensive digital signal processing  library for javascript
 *
 *  Created by Corban Brook <corbanbrook@gmail.com> on 2010-01-01.
 *  Copyright 2010 Corban Brook. All rights reserved.
 *
 */

/**
 * @typedef {ArrayLike<number>} DSPBuffer
 */

////////////////////////////////////////////////////////////////////////////////
//                            DSP UTILITY FUNCTIONS                           //
////////////////////////////////////////////////////////////////////////////////

/**
 * Inverts the phase of a signal
 * @template {DSPBuffer} T
 * @param {T} buffer A sample buffer
 *
 * @returns {T} The inverted sample buffer
 */
export function invert(buffer) {
	for (var i = 0, len = buffer.length; i < len; i++) {
		buffer[i] *= -1
	}

	return buffer
}

/**
 * Converts split-stereo (dual mono) sample buffers into a stereo interleaved sample buffer
 *
 * @param {DSPBuffer} left  A sample buffer
 * @param {DSPBuffer} right A sample buffer
 *
 * @returns {Float64Array} The stereo interleaved buffer
 */
export function interleave(left, right) {
	if (left.length !== right.length) {
		throw "Can not interleave. Channel lengths differ."
	}

	var stereoInterleaved = new Float64Array(left.length * 2)

	for (var i = 0, len = left.length; i < len; i++) {
		stereoInterleaved[2 * i] = left[i]
		stereoInterleaved[2 * i + 1] = right[i]
	}

	return stereoInterleaved
}

/**
 * Separates a channel from a stereo-interleaved sample buffer
 *
 * @param {DSPBuffer}  buffer A stereo-interleaved sample buffer
 *
 * @returns {Float64Array} an Array containing a signal mono sample buffer
 */
export function getLeftChannel(buffer) {
	let left = new Float64Array(buffer.length / 2)
	for (var i = 0, len = buffer.length / 2; i < len; i++) {
		left[i] = buffer[2 * i]
	}
	return left
}

/**
 * Separates a channel from a stereo-interleaved sample buffer
 *
 * @param {DSPBuffer}  buffer A stereo-interleaved sample buffer
 *
 * @returns {Float64Array} an Array containing a signal mono sample buffer
 */
export function getRightChannel(buffer) {
	let right = new Float64Array(buffer.length / 2)
	for (var i = 0, len = buffer.length / 2; i < len; i++) {
		right[i] = buffer[2 * i + 1]
	}
	return right
}

/**
 * Separates a channel from a stereo-interleaved sample buffer
 *
 * @param {DSPBuffer}  buffer A stereo-interleaved sample buffer
 *
 * @returns {Float64Array} an Array containing a signal mono sample buffer
 */
export function getMono(buffer) {
	let mono = new Float64Array(buffer.length / 2)
	for (var i = 0, len = buffer.length / 2; i < len; i++) {
		mono[i] = (buffer[2 * i] + buffer[2 * i + 1]) / 2
	}
	return mono
}

/**
 * Helper method (for Reverb) to mix two (interleaved) samplebuffers. It's possible
 * to negate the second buffer while mixing and to perform a volume correction
 * on the final signal.
 *
 * @param {Array} sampleBuffer1 Array containing Float values or a Float64Array
 * @param {Array} sampleBuffer2 Array containing Float values or a Float64Array
 * @param {Boolean} negate When true inverts/flips the audio signal
 * @param {Number} volumeCorrection When you add multiple sample buffers, use this to tame your signal ;)
 *
 * @returns A new Float64Array interleaved buffer.
 */
export function mixSampleBuffers(
	sampleBuffer1,
	sampleBuffer2,
	negate,
	volumeCorrection
) {
	var outputSamples = new Float64Array(sampleBuffer1)

	for (var i = 0; i < sampleBuffer1.length; i++) {
		outputSamples[i] +=
			(negate ? -sampleBuffer2[i] : sampleBuffer2[i]) / volumeCorrection
	}

	return outputSamples
}

/** @param {DSPBuffer} buffer */
export function rms(buffer) {
	let total = 0

	for (let i = 0, n = buffer.length; i < n; i++) {
		total += buffer[i] * buffer[i]
	}

	return Math.sqrt(total / n)
}

/**
 * Find Peak of signal
 * @param {DSPBuffer} buffer
 */
export function peak(buffer) {
	let peak = 0

	for (let i = 0, n = buffer.length; i < n; i++) {
		peak = Math.abs(buffer[i]) > peak ? Math.abs(buffer[i]) : peak
	}

	return peak
}

/**
 *  Magnitude to decibels
 *
 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
 *  Copyright 2010 Ricard Marxer. All rights reserved.
 *
 *  @param {DSPBuffer} buffer array of magnitudes to convert to decibels
 *
 *  @returns the array in decibels
 *
 */
export function mag2db(buffer) {
	let minDb = -120
	let minMag = Math.pow(10.0, minDb / 20.0)

	let log = Math.log
	let max = Math.max

	let result = Float64Array(buffer.length)
	for (let i = 0; i < buffer.length; i++) {
		result[i] = 20.0 * log(max(buffer[i], minMag))
	}

	return result
}

/*
 *  Frequency response
 *
 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
 *  Copyright 2010 Ricard Marxer. All rights reserved.
 *
 *  Calculates the frequency response at the given points.
 *
 *  @b b coefficients of the filter
 *  @a a coefficients of the filter
 *  @w w points (normally between -PI and PI) where to calculate the frequency response
 *
 *  @returns the frequency response in magnitude
 *
 */
export function freqz(b, a, w) {
	var i, j

	if (!w) {
		w = Float64Array(200)
		for (i = 0; i < w.length; i++) {
			w[i] = (DSP.TWO_PI / w.length) * i - Math.PI
		}
	}

	var result = Float64Array(w.length)

	var sqrt = Math.sqrt
	var cos = Math.cos
	var sin = Math.sin

	for (i = 0; i < w.length; i++) {
		var numerator = {real: 0.0, imag: 0.0}
		for (j = 0; j < b.length; j++) {
			numerator.real += b[j] * cos(-j * w[i])
			numerator.imag += b[j] * sin(-j * w[i])
		}

		var denominator = {real: 0.0, imag: 0.0}
		for (j = 0; j < a.length; j++) {
			denominator.real += a[j] * cos(-j * w[i])
			denominator.imag += a[j] * sin(-j * w[i])
		}

		result[i] =
			sqrt(numerator.real * numerator.real + numerator.imag * numerator.imag) /
			sqrt(
				denominator.real * denominator.real +
					denominator.imag * denominator.imag
			)
	}

	return result
}

export * as window from "./window.js"
export {default as FourierTransform} from "./fourier-transform.js"
export {default as FFT} from "./fft.js"
export {default as RFFT} from "./rfft.js"
export {default as DFT} from "./dft.js"
