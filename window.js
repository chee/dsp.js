/**
 * @param {number} index
 * @param {number} length
 */
export let bartlett = (index, length) =>
	(2 / (length - 1)) * ((length - 1) / 2 - Math.abs(index - (length - 1) / 2))

/**
 * @param {number} index
 * @param {number} length
 */
export let bartlettHann = (index, length) =>
	0.62 -
	0.48 * Math.abs(index / (length - 1) - 0.5) -
	0.38 * Math.cos((DSP.TWO_PI * index) / (length - 1))

/**
 * @param {number} index
 * @param {number} length
 */
export let blackman = (index, length, alpha = 0.16) => {
	let a0 = (1 - alpha) / 2
	let a1 = 0.5
	let a2 = alpha / 2

	return (
		a0 -
		a1 * Math.cos((DSP.TWO_PI * index) / (length - 1)) +
		a2 * Math.cos((4 * Math.PI * index) / (length - 1))
	)
}
/**
 * @param {number} index
 * @param {number} length
 */
export let cosine = (index, length) =>
	Math.cos((Math.PI * index) / (length - 1) - Math.PI / 2)
/**
 * @param {number} index
 * @param {number} length
 */
export let gauss = (index, length, alpha = 0.25) =>
	Math.pow(
		Math.E,
		-0.5 *
			Math.pow((index - (length - 1) / 2) / ((alpha * (length - 1)) / 2), 2)
	)
/**
 * @param {number} index
 * @param {number} length
 */
export let hamming = (index, length) =>
	0.54 - 0.46 * Math.cos((DSP.TWO_PI * index) / (length - 1))
/**
 * @param {number} index
 * @param {number} length
 */
export let hann = (index, length) =>
	0.5 * (1 - Math.cos((DSP.TWO_PI * index) / (length - 1)))
/**
 * @param {number} index
 * @param {number} length
 */
export let lanczos = (index, length) => {
	let x = (2 * index) / (length - 1) - 1
	return Math.sin(Math.PI * x) / (Math.PI * x)
}

export let rectangular = () => 1

/**
 * @param {number} index
 * @param {number} length
 */
export let triangular = (index, length) =>
	(2 / length) * (length / 2 - Math.abs(index - (length - 1) / 2))
