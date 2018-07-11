'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../../lib/settings');

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemTags = function ItemTags(_ref) {
  var tags = _ref.tags;

  if (tags && tags.length > 0) {
    return _react2.default.createElement(
      'div',
      { className: 'tags' },
      tags.map(function (tag, index) {
        return _react2.default.createElement(
          'span',
          { key: index, className: 'tag' },
          tag
        );
      })
    );
  } else {
    return null;
  }
};

exports.default = ItemTags;