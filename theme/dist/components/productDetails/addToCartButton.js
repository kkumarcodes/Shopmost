'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _helper = require('../../lib/helper');

var helper = _interopRequireWildcard(_helper);

var _settings = require('../../lib/settings');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddToCartButton = function AddToCartButton(_ref) {
  var product = _ref.product,
      variant = _ref.variant,
      addCartItem = _ref.addCartItem,
      isAllOptionsSelected = _ref.isAllOptionsSelected;

  var buttonStyle = {};
  if (_settings.themeSettings.button_addtocart_bg && _settings.themeSettings.button_addtocart_bg.length > 0) {
    buttonStyle.backgroundColor = _settings.themeSettings.button_addtocart_bg;
  }
  if (_settings.themeSettings.button_addtocart_color && _settings.themeSettings.button_addtocart_color.length > 0) {
    buttonStyle.color = _settings.themeSettings.button_addtocart_color;
  }

  var addToCartText = _settings.themeSettings.button_addtocart_text && _settings.themeSettings.button_addtocart_text.length > 0 ? _settings.themeSettings.button_addtocart_text : _settings.text.addToCart;

  if (product.stock_status === 'discontinued') {
    return _react2.default.createElement(
      'button',
      { className: 'button is-dark is-fullwidth', style: buttonStyle, disabled: true },
      _settings.text.discontinued
    );
  } else if (product.variable && variant && variant.stock_quantity > 0) {
    return _react2.default.createElement(
      'button',
      { className: 'button is-success is-fullwidth', style: buttonStyle, onClick: addCartItem },
      addToCartText
    );
  } else if (product.variable && !isAllOptionsSelected) {
    return _react2.default.createElement(
      'button',
      { className: 'button is-success is-fullwidth', style: buttonStyle, disabled: true },
      _settings.text.optionsRequired
    );
  } else if (product.variable && !product.stock_backorder) {
    return _react2.default.createElement(
      'button',
      { className: 'button is-success is-fullwidth', style: buttonStyle, disabled: true },
      _settings.text.outOfStock
    );
  } else if (product.stock_status === 'available') {
    return _react2.default.createElement(
      'button',
      { className: 'button is-success is-fullwidth', style: buttonStyle, onClick: addCartItem },
      addToCartText
    );
  } else if (product.stock_status === 'out_of_stock') {
    return _react2.default.createElement(
      'button',
      { className: 'button is-success is-fullwidth', style: buttonStyle, disabled: true },
      _settings.text.outOfStock
    );
  } else {
    return null;
  }
};

exports.default = AddToCartButton;