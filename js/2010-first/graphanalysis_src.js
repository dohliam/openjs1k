/* jStat - Statistical Library
 * Copyright (c) 2010, Trevor Norris
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php */
(function(Math,window){

var jStat = {},
	sum			= 'sum',
	min			= 'min',
	max			= 'max',
	mean			= 'mean',
	median			= 'median',
	range			= 'range',
	variance		= 'variance',
	stdev			= 'stdev',
	quartiles		= 'quartiles',
	covariance		= 'covariance',
	corrcoeff		= 'corrcoeff',
	
	Mmin	= Math.min,
	Mmax	= Math.max,
	Mfloor	= Math.floor,
	Mpow	= Math.pow,
	Msqrt	= Math.sqrt,
	Mround	= Math.round,
	
	arrSortF		= function(a, b){ return a - b; };

/**
 * Sum of an array
 * @return {Number}
 * @param {Array} arr
 * @example
 * jStat.sum([1,2,3])
 */
jStat[sum] = function(arr){
	var sm = 0,
		i = arr.length - 1;
	for(; i >= 0; i--){
		sm += arr[i];
	};
	return sm;
};

/**
 * Minimum value of an array
 * @return {Number}
 * @param {Array} arr
 * @example
 * jStat.min([1,2,3])
 */
jStat[min] = function(arr){
	return Mmin.apply(Math,arr);
};

/**
 * Maximum value of an array
 * @return {Number}
 * @param {Array} arr
 * @example
 * jStat.max([1,2,3])
 */
jStat[max] = function(arr){
	return Mmax.apply(Math,arr);
};

/**
 * Mean value of an array
 * @return {Number}
 * @param {Array} arr
 * @example
 * jStat.mean([1,2,3])
 */
jStat[mean] = function(arr){
	return jStat[sum](arr) / arr.length;
};

/**
 * Median of an array
 * @return {Number}
 * @param {Array} arr
 * @example
 * jStat.median([1,2,3,4,5,6])
 */
jStat[median] = function(arr){
	var arrlen = arr.length,
		_arr = arr.slice(0).sort(arrSortF);

	// Check if array is even or odd, then return the appropriate
	return !(arrlen & 1) ? (_arr[(arrlen / 2) - 1] + _arr[(arrlen / 2)]) / 2 : _arr[Mfloor(arrlen / 2)];
};

/**
 * Range of an array
 * @return {Number}
 * @param {Array} arr
 * @example
 * jStat.range([1,6,5,3,8,6])
 */
jStat[range] = function(arr){
	var _arr = arr.slice(0).sort(arrSortF);
	return _arr[_arr.length - 1] - _arr[0];
};

/**
 * Variance of an array
 * @return {Number}
 * @param {Array} arr
 * @example
 * jStat.variance([1,6,8,5,4,9,5,3])
 */
jStat[variance] = function(arr){
	var meen = jStat[mean](arr),
		stSum = 0,
		i = arr.length,
		arrlen = i;
	for(i--; i >= 0; i--){
		stSum += Mpow((arr[i] - meen), 2);
	};
	return stSum / (arrlen - 1);
};

/**
 * Standard deviation of an array
 * @return {Number}
 * @param {Array} arr
 * @example
 * jStat.stdev([4,5,9,7,5,3,4])
 */
jStat[stdev] = function(arr){
	return Msqrt(jStat[variance](arr));
};

/**
 * Quartiles of an array
 * @return {Array}
 * @param {Array} arr
 * @example
 * jStat.quartiles([1,2,3,6,9,3,1,2,5])
 */
jStat[quartiles] = function(arr){
	var arrlen = arr.length,
		_arr = arr.slice(0).sort(arrSortF);
	return [_arr[Mround((arrlen) / 4) - 1], _arr[Mround((arrlen) / 2) - 1], _arr[Mround((arrlen) * 3 / 4) - 1]];
};

/**
 * Covariance of two arrays
 * @return {Number}
 * @param {Array} arr1
 * @param {Array} arr2
 * @example
 * jStat.covariance([1,2,3,6,9,3,1,2,5],[2,3,5,2,5,7,8,9,6])
 */
jStat[covariance] = function(arr1, arr2){
	var u = jStat[mean](arr1),
		v = jStat[mean](arr2),
		sq_dev = [],
		arr1Len = arr1.length,
		i = 0;
	for(; i < arr1Len; i++){
		sq_dev[i] = (arr1[i] - u) * (arr2[i] - v);
	};
	return jStat[sum](sq_dev) / arr1Len;
};

/**
 * Correlation coefficient of two arrays
 * @return {Number}
 * @param {Array} arr1
 * @param {Array} arr2
 * @example
 * jStat.corrcoeff([1,2,3,6,9,3,1,2,5], [2,3,5,2,5,7,8,9,6])
 */
jStat[corrcoeff] = function(arr1, arr2){
	return jStat[covariance](arr1,arr2) / jStat[stdev](arr1) / jStat[stdev](arr2);
};

// Exposing jStat
window.jStat = jStat;

})(Math,window);
