'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../lib/settings');

var _header = require('../components/header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('../components/footer');

var _footer2 = _interopRequireDefault(_footer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fragment = _react2.default.Fragment;

var SharedContainer = function SharedContainer(props) {
  var _props$state = props.state,
      currentPage = _props$state.currentPage,
      settings = _props$state.settings;

  var hideFooter = (currentPage.path === '/checkout-success' || currentPage.path === '/checkout') && _settings.themeSettings.hide_footer_on_checkout === true;

  return _react2.default.createElement(
    Fragment,
    null,
    _react2.default.createElement(_header2.default, props),
    props.children,
    !hideFooter && _react2.default.createElement(_footer2.default, { settings: settings })
  );
};

exports.default = SharedContainer;