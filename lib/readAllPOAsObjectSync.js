'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_MAPPER = undefined;

var _glob = require('glob');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _po2json = require('po2json');

var _po2json2 = _interopRequireDefault(_po2json);

var _mapValues = require('lodash/mapValues');

var _mapValues2 = _interopRequireDefault(_mapValues);

var _toObjectBy = require('to-object-by');

var _toObjectBy2 = _interopRequireDefault(_toObjectBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_MAPPER = exports.DEFAULT_MAPPER = function DEFAULT_MAPPER(filepath) {
  return _path2.default.basename(filepath).match(/([^.]*\.)*([^.]+)\.po$/)[2];
};

/**
 * Read translated .po file synchronized and
 * aggregates translated messages object
 *
 * @param {String} srcPatterns - path to translated .po file
 * @return {Object} po - return aggregates object
 *
 * @author Michael Hsu
 */

function readAllPOAsObjectSync(srcPatterns) {
  var localeMapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MAPPER;

  var filepaths = (0, _glob.sync)(srcPatterns);

  return (0, _toObjectBy2.default)(filepaths, function (filepath) {
    var json = _po2json2.default.parseFileSync(filepath);
    var translated = (0, _mapValues2.default)(json, function (o) {
      return o[1];
    }); // omit plural
    var locale = localeMapper(filepath); // parse locale name

    return _defineProperty({}, locale, translated);
  });
}

exports.default = readAllPOAsObjectSync;