'use strict';

var define = require('define-properties');

var getPolyfill = require('./polyfill');
var getMap = require('es-map/polyfill');

module.exports = function shim() {
	var polyfill = getPolyfill();

	var $Map = getMap();
	define(
		$Map.prototype,
		{ getOrInsert: polyfill },
		{ getOrInsert: function () { return $Map.prototype.getOrInsert !== polyfill; } }
	);
	if (typeof Map === 'function' && Map !== $Map) {
		define(
			Map.prototype,
			{ getOrInsert: polyfill },
			{ getOrInsert: function () { return Map.prototype.getOrInsert !== polyfill; } }
		);
	}

	return polyfill;
};
