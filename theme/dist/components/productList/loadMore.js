'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _settings = require('../../lib/settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadMore = function LoadMore(_ref) {
  var loadMoreProducts = _ref.loadMoreProducts,
      hasMore = _ref.hasMore,
      loading = _ref.loading,
      className = _ref.className;

  if (hasMore) {
    className = className || 'button is-fullwidth is-dark';

    var buttonStyle = {};
    if (_settings.themeSettings.button_loadmore_bg && _settings.themeSettings.button_loadmore_bg.length > 0) {
      buttonStyle.backgroundColor = _settings.themeSettings.button_loadmore_bg;
    }
    if (_settings.themeSettings.button_loadmore_color && _settings.themeSettings.button_loadmore_color.length > 0) {
      buttonStyle.color = _settings.themeSettings.button_loadmore_color;
    }

    var loadMoreText = _settings.themeSettings.button_loadmore_text && _settings.themeSettings.button_loadmore_text.length > 0 ? _settings.themeSettings.button_loadmore_text : _settings.text.loadMore;

    return _react2.default.createElement(
      'button',
      { onClick: loadMoreProducts, className: className + (loading ? ' is-loading' : ''), style: buttonStyle },
      loadMoreText
    );
  } else {
    return null;
  }
};

exports.default = LoadMore;