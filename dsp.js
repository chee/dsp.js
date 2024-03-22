/*
 *  DSP.js - a comprehensive digital signal processing  library for javascript
 *
 *  Created by Corban Brook <corbanbrook@gmail.com> on 2010-01-01.
 *  Copyright 2010 Corban Brook. All rights reserved.
 *
 */

import {TWO_PI} from "./constants.js"

/**
 * Inverts the phase of a signal
 * @param {Float32Array} buffer A sample buffer
 * @returns {Float32Array} The inverted sample buffer
 */
export function invert(buffer) {
	for (let i = 0, len = buffer.length; i < len; i++) {
		buffer[i] *= -1
	}

	return buffer
}

/**
 * Converts split-stereo (dual mono) sample buffers into a stereo interleaved sample buffer
 *
 * @param {Float32Array} left  A sample buffer
 * @param {Float32Array} right A sample buffer
 *
 * @returns {Float32Array} The stereo interleaved buffer
 */
export function interleave(left, right) {
	if (left.length !== right.length) {
		throw "Can not interleave. Channel lengths differ."
	}

	let stereoInterleaved = new Float32Array(left.length * 2)

	for (let i = 0, len = left.length; i < len; i++) {
		stereoInterleaved[2 * i] = left[i]
		stereoInterleaved[2 * i + 1] = right[i]
	}

	return stereoInterleaved
}

/**
 * Separates a channel from a stereo-interleaved sample buffer
 *
 * @param {Float32Array}  buffer A stereo-interleaved sample buffer
 *
 * @returns {Float32Array} an Array containing a signal mono sample buffer
 */
export function getLeftChannel(buffer) {
	let left = new Float32Array(buffer.length / 2)
	for (let i = 0, len = buffer.length / 2; i < len; i++) {
		left[i] = buffer[2 * i]
	}
	return left
}

/**
 * Separates a channel from a stereo-interleaved sample buffer
 *
 * @param {Float32Array}  buffer A stereo-interleaved sample buffer
 *
 * @returns {Float32Array} an Array containing a signal mono sample buffer
 */
export function getRightChannel(buffer) {
	let right = new Float32Array(buffer.length / 2)
	for (let i = 0, len = buffer.length / 2; i < len; i++) {
		right[i] = buffer[2 * i + 1]
	}
	return right
}

/**
 * Separates a channel from a stereo-interleaved sample buffer
 *
 * @param {Float32Array}  buffer A stereo-interleaved sample buffer
 *
 * @returns {Float32Array} an Array containing a signal mono sample buffer
 */
export function getMono(buffer) {
	let mono = new Float32Array(buffer.length / 2)
	for (let i = 0, len = buffer.length / 2; i < len; i++) {
		mono[i] = (buffer[2 * i] + buffer[2 * i + 1]) / 2
	}
	return mono
}

/**
 * Helper method (for Reverb) to mix two (interleaved) samplebuffers. It's possible
 * to negate the second buffer while mixing and to perform a volume correction
 * on the final signal.
 *
 * @param {Float32Array} sampleBuffer1 samples
 * @param {Float32Array} sampleBuffer2 samples
 * @param {Boolean} negate When true inverts/flips the audio signal
 * @param {Number} volumeCorrection When you add multiple sample buffers, use this to tame your signal ;)
 *
 * @returns A new Float32Array interleaved buffer.
 */
export function mixSampleBuffers(
	sampleBuffer1,
	sampleBuffer2,
	negate,
	volumeCorrection
) {
	let outputSamples = new Float32Array(sampleBuffer1)

	for (let i = 0; i < sampleBuffer1.length; i++) {
		outputSamples[i] +=
			(negate ? -sampleBuffer2[i] : sampleBuffer2[i]) / volumeCorrection
	}

	return outputSamples
}

/** @param {Float32Array} buffer */
export function rms(buffer) {
	let total = 0

	for (let i = 0; i < buffer.length; i++) {
		total += buffer[i] * buffer[i]
	}

	return Math.sqrt(total / buffer.length)
}

/**
 * Find Peak of signal
 * @param {Float32Array} buffer
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
 *  @param {Float32Array} buffer array of magnitudes to convert to decibels
 *
 *  @returns {Float32Array} the array in decibels
 *
 */
export function mag2db(buffer) {
	let minDb = -120
	let minMag = Math.pow(10.0, minDb / 20.0)

	let log = Math.log
	let max = Math.max

	let result = new Float32Array(buffer.length)
	for (let i = 0; i < buffer.length; i++) {
		result[i] = 20.0 * log(max(buffer[i], minMag))
	}

	return result
}

/**
 *  Frequency response
 *
 *  Created by Ricard Marxer <email@ricardmarxer.com> on 2010-05-23.
 *  Copyright 2010 Ricard Marxer. All rights reserved.
 *
 *  Calculates the frequency response at the given points.
 *
 *  @param {Float32Array} b coefficients of the filter
 *  @param {Float32Array} a coefficients of the filter
 *  @param {Float32Array} w points (normally between -PI and PI) where to calculate the frequency response
 *
 *  @returns the frequency response in magnitude
 *
 */
export function freqz(b, a, w) {
	let i, j

	if (!w) {
		w = new Float32Array(200)
		for (i = 0; i < w.length; i++) {
			w[i] = (TWO_PI / w.length) * i - Math.PI
		}
	}

	let result = new Float32Array(w.length)

	let sqrt = Math.sqrt
	let cos = Math.cos
	let sin = Math.sin

	for (i = 0; i < w.length; i++) {
		let numerator = {real: 0.0, imag: 0.0}
		for (j = 0; j < b.length; j++) {
			numerator.real += b[j] * cos(-j * w[i])
			numerator.imag += b[j] * sin(-j * w[i])
		}

		let denominator = {real: 0.0, imag: 0.0}
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
