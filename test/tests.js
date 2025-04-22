'use strict';

var getMap = require('es-map/polyfill');
var forEach = require('for-each');
var inspect = require('object-inspect');
var v = require('es-value-fixtures');

var $Map = getMap();

module.exports = function (getOrInsert, t) {
	t.equal(typeof getOrInsert, 'function', 'is a function');

	t.test('no Maps', { skip: $Map }, function (st) {
		st['throws'](
			function () { getOrInsert([], Boolean); },
			SyntaxError,
			'Maps are not supported'
		);

		st.end();
	});

	t.test('non-Maps', function (st) {
		forEach(v.primitives.concat(v.objects), function (nonMap) {
			st['throws'](
				function () { getOrInsert(nonMap); },
				TypeError,
				inspect(nonMap) + ' is not a Map'
			);
		});

		st.end();
	});

	t.test('functionality', { skip: !$Map }, function (st) {
		var m = new $Map();
		var key = { key: true };
		var sentinel = { sentinel: true };

		st.notOk(m.has(key), 'starts without key');

		st.equal(getOrInsert(m, key, sentinel), sentinel, 'returns value');

		st.ok(m.has(key), 'ends with key');

		st.equal(getOrInsert(m, key, sentinel), sentinel, 'still returns value');

		st.ok(m.has(key), 'still has key');

		st.test('negative zero as a key', function (s2t) {
			var m2 = new $Map();

			s2t.notOk(m2.has(-0), 'starts without -0');
			s2t.notOk(m2.has(+0), 'starts without +0');

			s2t.equal(getOrInsert(m2, -0, sentinel), sentinel, 'returns value');
			s2t.equal(m2.get(-0), sentinel, 'gets -0’s value');
			s2t.equal(m2.get(0), sentinel, 'gets +0’s value');

			s2t.ok(m2.has(0), 'ends having -0');
			s2t.ok(m2.has(+0), 'ends having +0');

			s2t.deepEqual(m2, new $Map([[+0, sentinel]]), 'entries are correct, and only has +0');

			s2t.end();
		});

		st.test('Sets', { skip: typeof Set !== 'function' }, function (s2t) {
			var s = new Set();

			s2t['throws'](
				function () { getOrInsert(s); },
				TypeError,
				'Set is not a Map'
			);

			s2t.end();
		});

		st.end();
	});
};
