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

var FormattedCurrency = function FormattedCurrency(_ref) {
  var number = _ref.number,
      settings = _ref.settings;
  return helper.formatCurrency(number, settings);
};

var NewAndOldPrices = function NewAndOldPrices(_ref2) {
  var newPrice = _ref2.newPrice,
      oldPrice = _ref2.oldPrice,
      settings = _ref2.settings;
  return _react2.default.createElement(
    'div',
    { className: 'product-price' },
    _react2.default.createElement(
      'span',
      { className: 'product-new-price' },
      _react2.default.createElement(FormattedCurrency, { settings: settings, number: newPrice })
    ),
    _react2.default.createElement(
      'del',
      { className: 'product-old-price' },
      _react2.default.createElement(FormattedCurrency, { settings: settings, number: oldPrice })
    )
  );
};

var Price = function Price(_ref3) {
  var product = _ref3.product,
      variant = _ref3.variant,
      isAllOptionsSelected = _ref3.isAllOptionsSelected,
      settings = _ref3.settings;

  var priceStyle = {};
  if (_settings.themeSettings.details_price_size && _settings.themeSettings.details_price_size > 0) {
    priceStyle.fontSize = _settings.themeSettings.details_price_size + 'px';
  }
  if (_settings.themeSettings.details_price_color && _settings.themeSettings.details_price_color.length > 0) {
    priceStyle.color = _settings.themeSettings.details_price_color;
  }

  var price = 0;
  var oldPrice = 0;

  if (product.variable && variant && variant.price > 0) {
    price = variant.price;
  } else {
    price = product.price;
  }

  if (product.on_sale) {
    oldPrice = product.regular_price;
  }

  if (oldPrice > 0) {
    return _react2.default.createElement(NewAndOldPrices, { settings: settings, newPrice: price, oldPrice: oldPrice });
  } else {
    return _react2.default.createElement(
      'div',
      { className: 'product-price', style: priceStyle },
      _react2.default.createElement(FormattedCurrency, { settings: settings, number: price })
    );
  }
};

exports.default = Price;