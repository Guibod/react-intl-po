'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _glob = require('glob');

var _mergeWith = require('lodash/mergeWith');

var _mergeWith2 = _interopRequireDefault(_mergeWith);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _toObjectBy = require('to-object-by');

var _toObjectBy2 = _interopRequireDefault(_toObjectBy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// hint: Use defaultMessage as key by default
var DEFAULT_MAPPER = function DEFAULT_MAPPER(message, filename) {
  return _defineProperty({}, message.defaultMessage, [_extends({}, message, { filename: filename, mappedBy: 'defaultMessage' })]);
};

/**
 * Read extracted .json file synchronized and
 * aggregates origin messages objects
 *
 * @param {String} srcPatterns - path to translated .json file
 * @return {Object} messages - return aggregates object
 *
 * @author Michael Hsu
 */

function readAllMessageAsObjectSync(srcPatterns) {
  var messageMapper = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_MAPPER;

  return (0, _glob.sync)(srcPatterns)
  // 1. read messages
  .map(function (filename) {
    return { filename: filename, messages: JSON.parse(_fs2.default.readFileSync(filename, 'utf8')) };
  })
  // 2. convert message list to object by defaultMessage
  .map(function (_ref2) {
    var filename = _ref2.filename,
        messages = _ref2.messages;
    return (0, _toObjectBy2.default)(messages, function (e) {
      return messageMapper(e, filename);
    });
  })
  // 3. aggregate objects (merge and concat)
  .reduce(function (acc, object) {
    return (0, _mergeWith2.default)(acc, object, function (accValue, objectValue) {
      if (!(0, _isArray2.default)(accValue)) return objectValue;

      return accValue.concat(objectValue);
    });
  }, {});
}

exports.default = readAllMessageAsObjectSync;
module.exports = exports['default'];