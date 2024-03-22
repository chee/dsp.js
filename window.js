import {TWO_PI} from "./constants.js"

/**
 * @param {number} value
 * @param {number} index
 * @param {Float32Array} array
 */
export let bartlett = (value, index, array) =>
	value *
	(2 / (array.length - 1)) *
	((array.length - 1) / 2 - Math.abs(index - (array.length - 1) / 2))

/**
 * @param {number} value
 * @param {number} index
 * @param {Float32Array} array
 */
export let bartlettHann = (value, index, array) =>
	value * 0.62 -
	0.48 * Math.abs(index / (array.length - 1) - 0.5) -
	0.38 * Math.cos((TWO_PI * index) / (array.length - 1))

/**
 * @param {number} value
 * @param {number} index
 * @param {Float32Array} array
 */
export let cosine = (value, index, array) =>
	value * Math.cos((Math.PI * index) / (array.length - 1) - Math.PI / 2)

/**
 * @param {number} value
 * @param {number} index
 * @param {Float32Array} array
 */
export let hamming = (value, index, array) =>
	value * 0.54 - 0.46 * Math.cos((TWO_PI * index) / (array.length - 1))
/**
 * @param {number} value
 * @param {number} index
 * @param {Float32Array} array
 */
export let hann = (value, index, array) =>
	value * 0.5 * (1 - Math.cos((TWO_PI * index) / (array.length - 1)))

/**
 * @param {number} value
 * @param {number} index
 * @param {Float32Array} array
 */
export let lanczos = (value, index, array) => {
	let x = (2 * index) / (array.length - 1) - 1
	return (value * Math.sin(Math.PI * x)) / (Math.PI * x)
}

/**
 * @param {number} value
 * @param {number} _index
 * @param {Float32Array} _array
 */
export let rectangular = (value, _index, _array) => value

/**
 * @param {number} value
 * @param {number} index
 * @param {Float32Array} array
 */
export let triangular = (value, index, array) =>
	value *
	(2 / array.length) *
	(array.length / 2 - Math.abs(index - (array.length - 1) / 2))
