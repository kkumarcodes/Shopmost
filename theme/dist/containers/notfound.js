'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../lib/settings');

var _metaTags = require('../components/metaTags');

var _metaTags2 = _interopRequireDefault(_metaTags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fragment = _react2.default.Fragment;

var NotFoundContainer = function NotFoundContainer(props) {
  return _react2.default.createElement(
    Fragment,
    null,
    _react2.default.createElement(_metaTags2.default, {
      title: _settings.text.title404
    }),
    _react2.default.createElement(
      'section',
      { className: 'section' },
      _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'content' },
          _react2.default.createElement(
            'h1',
            null,
            _settings.text.title404
          ),
          _settings.text.text404
        )
      )
    )
  );
};

exports.default = NotFoundContainer;