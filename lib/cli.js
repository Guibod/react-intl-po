#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.command('json2pot <srcPatterns>').option('-o, --output <path>', 'The output pathname of `.pot` file to be translated').option('-k, --message-key [key]', 'Translation message key (default key is `defaultMessage`)').action(require('./extractAndWritePOTFromMessagesSync'));

_commander2.default.command('po2json <srcPatterns>').option('-m, --messages-pattern <path>', 'The pattern of *json* files extracted from *babel-plugin-react-intl*').option('-o, --output <path>', 'The output pathname of a file / directory').option('-k, --message-key [key]', 'Translation message key (default key is `defaultMessage`)').action(require('./filterPOAndWriteTranslateSync'));

_commander2.default.parse(process.argv);