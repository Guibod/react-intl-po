'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Ensure that multi-line strings are properly commented out
 *
 * For instance:
 * This is\nmy multi-line\ncomment
 *
 * should be escaped as :
 * #. This is
 * #. my multi-line
 * #. comment
 *
 * @param {String} commentPrefix
 * @param {String} rawComment
 * @returns {String}
 *
 * @author Guillaume Boddaert
 */
var potCommentMultiLineWrapper = function potCommentMultiLineWrapper(commentPrefix, rawComment) {
  var comments = rawComment.split('\n');
  return comments.reduce(function (a, b) {
    return '' + a + commentPrefix + ' ' + b + '\n';
  }, '');
};

/**
 * Formatting POT comments
 * @param {Object[]} messageList
 * @return {String}
 *
 * example: see tests
 *
 * @author Michael Hsu
 * @author Guillaume Boddaert
 */
var potCommentsFormater = function potCommentsFormater(messageList) {
  return messageList.reduce(function (acc, _ref) {
    var filename = _ref.filename,
        id = _ref.id,
        description = _ref.description,
        defaultMessage = _ref.defaultMessage,
        mappedBy = _ref.mappedBy;

    var out = acc;
    out += potCommentMultiLineWrapper('#:', filename);
    if (description) {
      out += potCommentMultiLineWrapper('#.', '[' + id + '] - ' + description);
    } else {
      out += potCommentMultiLineWrapper('#.', '[' + id + ']');
    }
    if (mappedBy && mappedBy !== 'defaultMessage') {
      out += potCommentMultiLineWrapper('#.', 'defaultMessage is:\n' + defaultMessage);
    }

    return out;
  }, '');
};

/**
 * Formatting POT comments
 * @param {Object} messageObject
 * @return {String}
 *
 * example: see tests
 *
 * @author Michael Hsu
 */

var potFormater = function potFormater(messageObject) {
  return Object.keys(messageObject) // return array of id
  .sort().map(function (id) {
    return potCommentsFormater(messageObject[id]) + 'msgid "' + id + '"\nmsgstr ""\n';
  }).join('\n');
};

exports.default = potFormater;
module.exports = exports['default'];