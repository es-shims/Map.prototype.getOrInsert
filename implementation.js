'use strict';

var callBind = require('call-bind');

var CanonicalizeKeyedCollectionKey = require('./aos/CanonicalizeKeyedCollectionKey');

var $Map = require('es-map/polyfill')();

var $mapHas = callBind($Map.prototype.has);
var $mapGet = callBind($Map.prototype.get);
var $mapSet = callBind($Map.prototype.set);

module.exports = function getOrInsert(key, value) {
	var M = this; // step 1

	// 2. Perform ? RequireInternalSlot(M, [[MapData]]).
	$mapHas(M); // step 2

	// eslint-disable-next-line no-param-reassign
	key = CanonicalizeKeyedCollectionKey(key); // step 3

	if ($mapHas(M, key)) { // step 4
		return $mapGet(M, key); // step 4.a
	}

	$mapSet(M, key, value); // step 5, 6

	return value; // step 7
};
