// Fourier Transform Module used by DFT, FFT, RFFT
export default class FourierTransform {
	peak = 0
	peakBand = 0
	/**
	 * @param {Number} bufferSize The size of the sample buffer to be computed
	 * @param {Number} sampleRate The sampleRate of the buffer (eg. 44100)
	 */
	constructor(bufferSize, sampleRate) {
		this.bufferSize = bufferSize
		this.sampleRate = sampleRate
		this.bandwidth = ((2 / bufferSize) * sampleRate) / 2

		this.spectrum = new Float32Array(bufferSize / 2)
		this.real = new Float32Array(bufferSize)
		this.imag = new Float32Array(bufferSize)
	}

	/**
	 * Calculates the *middle* frequency of an FFT band.
	 *
	 * @param {number} index The index of the FFT band.
	 *
	 * @returns The middle frequency in Hz.
	 */
	getBandFrequency(index) {
		return this.bandwidth * index + this.bandwidth / 2
	}

	/** */
	calculateSpectrum() {
		var spectrum = this.spectrum,
			real = this.real,
			imag = this.imag,
			bSi = 2 / this.bufferSize,
			sqrt = Math.sqrt,
			rval,
			ival,
			mag

		for (var i = 0, N = this.bufferSize / 2; i < N; i++) {
			rval = real[i]
			ival = imag[i]
			mag = bSi * sqrt(rval * rval + ival * ival)

			if (mag > this.peak) {
				this.peakBand = i
				this.peak = mag
			}

			spectrum[i] = mag
		}

		return this.spectrum
	}
}
