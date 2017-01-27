'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Create a POT header string
 * @param {Object} options
 * @param {String|String[]} [options.comments]
 * @param {Date} [options.potCreationDate] used for POT-Creation-Date
 * @param {String} [options.projectIdVersion] Project-Id-Version
 * @param {String} [options.charset]
 * @param {String} [options.encoding]
 * @return {String} potSource
 *
 * example: see tests
 *
 * @see https://www.gnu.org/software/trans-coord/manual/gnun/html_node/PO-Header.html
 * @author Guillaume Boddaert
 */

var potHeader = function potHeader() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var header = '';

  if (options.comments) {
    var comments = options.comments;
    if (!Array.isArray(options.comments)) {
      comments = [options.comments];
    }
    comments = comments.reduce(function (o, n) {
      return o.concat(n.split('\n'));
    }, []);
    header += comments.map(function (comment) {
      return '# ' + comment;
    }).join('\n') + '\n';
  }
  header += 'msgid ""\nmsgstr ""\n';

  if (options.projectIdVersion) {
    header += '"Project-Id-Version: ' + options.projectIdVersion + '\\n"\n';
  }
  if (options.potCreationDate) {
    header += '"POT-Creation-Date: ' + options.potCreationDate.toISOString() + '\\n"\n';
  }
  if (options.charset) {
    header += '"Content-Type: text/plain; charset=' + options.charset + '\\n"\n';
  }
  if (options.encoding) {
    header += '"Content-Transfer-Encoding: ' + options.encoding + '\\n"\n';
  }
  header += '"MIME-Version: 1.0\\n"\n';
  header += '"X-Generator: react-intl-po\\n"\n';
  header += '\n\n';
  return header;
};

exports.default = potHeader;
module.exports = exports['default'];