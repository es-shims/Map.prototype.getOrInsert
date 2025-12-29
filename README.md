# map.prototype.getorinsert <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![github actions][actions-image]][actions-url]
[![coverage][codecov-image]][codecov-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ESnext spec-compliant `Map.prototype.getOrInsert` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) v3 interface. It works in an ES3-supported environment and complies with the proposed [spec](https://tc39.github.io/proposal-array-grouping/).

## Getting started

```sh
npm install --save map.prototype.getorinsert
```

## Usage/Examples

```js
var getOrInsert = require('map.prototype.getorinsert');
var assert = require('assert');

var map = new Map();
var key = {};
var value = {};

assert.equal(map.has(key), false);
assert.equal(getOrInsert(map, key, value), value);
assert.equal(map.has(key), true);
```

```js
var getPolyfill = require('map.prototype.getorinsert/polyfill');
var shim = require('map.prototype.getorinsert/shim');
var assert = require('assert');
/* when Map.prototype.getOrInsert is not present */
delete Map.prototype.getOrInsert;
var shimmed = shim();

assert.equal(shimmed, getPolyfill());

var map = new Map();
var key = {};
var value = {};

assert.equal(map.has(key), false);
assert.equal(map.getOrInsert(key, value), value);
assert.equal(map.has(key), true);
```

```js
var shim = require('map.prototype.getorinsert/shim');
var assert = require('assert');
/* when Map.prototype.getOrInsert is present */
var shimmed = shim();

assert.equal(shimmed, Map.prototype.getOrInsert);

var map = new Map();
var key = {};
var value = {};

assert.equal(map.has(key), false);
assert.equal(map.getOrInsert(key, value), value);
assert.equal(map.has(key), true);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/map.prototype.getorinsert
[npm-version-svg]: https://versionbadg.es/es-shims/Map.prototype.getOrInsert.svg
[deps-svg]: https://david-dm.org/es-shims/Map.prototype.getOrInsert.svg
[deps-url]: https://david-dm.org/es-shims/Map.prototype.getOrInsert
[dev-deps-svg]: https://david-dm.org/es-shims/Map.prototype.getOrInsert/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Map.prototype.getOrInsert#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/map.prototype.getorinsert.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/map.prototype.getorinsert.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/map.prototype.getorinsert.svg
[downloads-url]: https://npm-stat.com/charts.html?package=map.prototype.getorinsert
[codecov-image]: https://codecov.io/gh/es-shims/Map.prototype.getOrInsert/branch/main/graphs/badge.svg
[codecov-url]: https://app.codecov.io/gh/es-shims/Map.prototype.getOrInsert/
[actions-image]: https://img.shields.io/github/check-runs/es-shims/Map.prototype.getOrInsert/main
[actions-url]: https://github.com/es-shims/Map.prototype.getOrInsert/actions
