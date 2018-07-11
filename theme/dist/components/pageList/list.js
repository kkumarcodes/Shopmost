'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../../lib/settings');

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageList = function PageList(_ref) {
  var pages = _ref.pages;

  var items = pages ? pages.map(function (page, index) {
    return _react2.default.createElement(_item2.default, { key: index, page: page });
  }) : null;

  return _react2.default.createElement(
    'div',
    { className: 'page-list' },
    items
  );
};

exports.default = PageList;