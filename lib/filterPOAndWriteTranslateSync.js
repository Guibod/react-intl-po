'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _values = require('lodash/values');

var _values2 = _interopRequireDefault(_values);

var _flatten = require('lodash/flatten');

var _flatten2 = _interopRequireDefault(_flatten);

var _flowRight = require('lodash/flowRight');

var _flowRight2 = _interopRequireDefault(_flowRight);

var _toObjectBy = require('to-object-by');

var _toObjectBy2 = _interopRequireDefault(_toObjectBy);

var _readAllMessageAsObjectSync = require('./readAllMessageAsObjectSync');

var _readAllMessageAsObjectSync2 = _interopRequireDefault(_readAllMessageAsObjectSync);

var _readAllPOAsObjectSync = require('./readAllPOAsObjectSync');

var _readAllPOAsObjectSync2 = _interopRequireDefault(_readAllPOAsObjectSync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /* eslint-disable no-console */


var isAJSONFile = function isAJSONFile(string) {
  return (/.json/.test(string)
  );
};

function filterPOAndWriteTranslateSync(srcPatterns, _ref) {
  var _ref$messageKey = _ref.messageKey,
      messageKey = _ref$messageKey === undefined ? 'defaultMessage' : _ref$messageKey,
      messagesPattern = _ref.messagesPattern,
      output = _ref.output;

  var translationTable = (0, _readAllPOAsObjectSync2.default)(srcPatterns);
  var messageList = (0, _flowRight2.default)(_flatten2.default, // 3. return flatten object values
  _values2.default, // 2. return object values
  _readAllMessageAsObjectSync2.default)(messagesPattern);

  var locales = Object.keys(translationTable);
  var result = (0, _toObjectBy2.default)(locales, function (locale) {
    return _defineProperty({}, locale, (0, _toObjectBy2.default)(messageList, function (message) {
      return _defineProperty({}, message.id, translationTable[locale][message[messageKey]]);
    }));
  });

  if (isAJSONFile(output)) {
    _mkdirp2.default.sync(_path2.default.dirname(output)); // ensure the output folder exists
    _fs2.default.writeFileSync(output, JSON.stringify(result, null, 0));
    console.log(_chalk2.default.green('> [react-intl-po] write file -> ' + output + ' \u2714\uFE0F\n'));
  } else {
    _mkdirp2.default.sync(output); // ensure the output folder exists

    Object.keys(result).map(function (lang) {
      _fs2.default.writeFileSync(_path2.default.join(output, lang + '.json'), JSON.stringify(result[lang], null, 0));
      console.log(_chalk2.default.green('> [react-intl-po] write file -> ' + _path2.default.join(output, lang + '.json') + ' \u2714\uFE0F'));
      return null;
    });
  }
}

exports.default = filterPOAndWriteTranslateSync;
module.exports = exports['default'];