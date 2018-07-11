'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

var _settings = require('../../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pad = function pad(number) {
  return number < 10 ? '0' + number : number;
};
var formatDate = function formatDate(date) {
  return pad(date.getDate()) + '.' + pad(date.getMonth() + 1) + '.' + date.getFullYear();
};

var PageListItem = function PageListItem(_ref) {
  var page = _ref.page;
  return _react2.default.createElement(
    'div',
    { className: 'page-item' },
    _react2.default.createElement(
      'h2',
      null,
      _react2.default.createElement(
        _reactRouterDom.NavLink,
        { to: page.path },
        page.meta_title
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'date' },
      formatDate(new Date(page.date_created))
    ),
    _react2.default.createElement(
      'div',
      { className: 'description' },
      page.meta_description
    )
  );
};

exports.default = PageListItem;